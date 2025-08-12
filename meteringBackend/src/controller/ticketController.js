// routes/tickets.js
const express = require("express");

const Ticket = require("../model/Ticket");
const User = require("../model/User");
// const { authenticate, authorize } = require("../middleware/auth");

const createTicket = async (req, res) => {
  // Create a new ticket
  // router.post("/", authenticate, async (req, res) => {
  try {
    const { title, description, priority, category, tags } = req.body;

    const customer = await User.findById(req.user.id);
    if (!customer) {
      return res.status(404).json({ message: "User not found" });
    }

    const ticketData = {
      title,
      description,
      customer: req.user.id,
      email: customer.email,
      phone: customer.phonenumber || "",
      priority,
      category,
      tags,
      adminId: customer.adminId || null,
      superAdminId: customer.superAdminId || null,
    };

    const ticket = new Ticket(ticketData);
    await ticket.save();

    res.status(201).json(ticket);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all tickets (with filters)
const getAllTickets = async (req, res) => {
  try {
    const { status, priority, search, category } = req.query;
    const filter = {};

    if (req.user.role === "user") {
      filter.customer = req.user.id;
    } else if (req.user.role === "admin") {
      filter.$or = [{ adminId: req.user.id }, { assignedTo: req.user.id }];
    } else if (req.user.role === "superAdmin") {
      // Super admin can see all tickets
    }

    if (status && status !== "All") filter.status = status;
    if (priority && priority !== "All") filter.priority = priority;
    if (category) filter.category = category;

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { ticketId: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    const tickets = await Ticket.find(filter)
      .populate("customer", "name email")
      .populate("assignedTo", "name")
      .sort({ createdAt: -1 });

    res.json(tickets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get ticket by ID

const getTicketbyID = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id)
      .populate("customer", "name email")
      .populate("assignedTo", "name")
      .populate("comments.author", "name");

    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    // Check permissions
    if (
      req.user.role === "user" &&
      ticket.customer._id.toString() !== req.user.id
    ) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    if (
      req.user.role === "admin" &&
      ticket.adminId.toString() !== req.user.id &&
      ticket.assignedTo?._id.toString() !== req.user.id
    ) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    res.json(ticket);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update ticket (status, priority, assignee, etc.)

const updateTicket = async (req, res) => {
  try {
    const { actionType, ...updateData } = req.body;
    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    // Check permissions
    const isAdminOrSuperAdmin = ["admin", "superAdmin"].includes(req.user.role);
    const isAssignedTo = ticket.assignedTo?.toString() === req.user.id;
    const isCustomer = ticket.customer.toString() === req.user.id;

    if (!isAdminOrSuperAdmin && !isAssignedTo && !isCustomer) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    // Handle different action types
    if (actionType === "update_status") {
      if (!isAdminOrSuperAdmin && !isAssignedTo) {
        return res
          .status(403)
          .json({ message: "Unauthorized to change status" });
      }
      ticket.status = updateData.newStatus;
    } else if (actionType === "update_priority") {
      if (!isAdminOrSuperAdmin) {
        return res
          .status(403)
          .json({ message: "Unauthorized to change priority" });
      }
      ticket.priority = updateData.newPriority;
    } else if (actionType === "reassign_ticket") {
      if (!isAdminOrSuperAdmin) {
        return res.status(403).json({ message: "Unauthorized to reassign" });
      }
      ticket.assignedTo = updateData.newAssignee;
    } else if (actionType === "forward_to_superadmin") {
      if (req.user.role !== "admin") {
        return res
          .status(403)
          .json({ message: "Only admins can forward tickets" });
      }
      ticket.forwardedToSuperAdmin = true;
      ticket.forwardedReason = updateData.reason;
    } else {
      // General update (only customer can update description/title)
      if (!isCustomer) {
        return res
          .status(403)
          .json({ message: "Unauthorized to update ticket details" });
      }
      if (updateData.title) ticket.title = updateData.title;
      if (updateData.description) ticket.description = updateData.description;
    }

    await ticket.save();
    res.json(ticket);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add comment to ticket

const addCommentToTicket = async (req, res) => {
  try {
    const { content } = req.body;
    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    // Check permissions
    const isAdminOrSuperAdmin = ["admin", "superAdmin"].includes(req.user.role);
    const isAssignedTo = ticket.assignedTo?.toString() === req.user.id;
    const isCustomer = ticket.customer.toString() === req.user.id;

    if (!isAdminOrSuperAdmin && !isAssignedTo && !isCustomer) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const comment = {
      author: req.user.id,
      content,
    };

    ticket.comments.push(comment);
    await ticket.save();

    res.status(201).json(ticket);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete ticket

const deleteTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    // Only super admins or the ticket creator can delete
    if (
      req.user.role !== "superAdmin" &&
      ticket.customer.toString() !== req.user.id
    ) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await ticket.remove();
    res.json({ message: "Ticket deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get ticket statistics

const stats = async (req, res) => {
  try {
    const stats = {
      total: await Ticket.countDocuments(),
      open: await Ticket.countDocuments({ status: "Open" }),
      inProgress: await Ticket.countDocuments({ status: "In Progress" }),
      resolved: await Ticket.countDocuments({ status: "Resolved" }),
      closed: await Ticket.countDocuments({ status: "Closed" }),
    };
    res.json(stats);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// module.exports = router;

module.exports = {
  createTicket,
  getAllTickets,
  getTicketbyID,
  updateTicket,
  addCommentToTicket,
  deleteTicket,
  stats
};
