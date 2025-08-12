// models/Ticket.js
const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  content: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

const ticketSchema = new mongoose.Schema(
  {
    ticketId: {
      type: String,
      required: true,
      unique: true
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    email: {
      type: String,
      required: false
    },
    phone: {
      type: String
    },
    priority: {
      type: String,
      enum: ["Low", "Medium", "High", "Critical"],
      default: "Medium"
    },
    status: {
      type: String,
      enum: ["Open", "In Progress", "Resolved", "Closed"],
      default: "Open"
    },
    category: {
      type: String,
      enum: ["Technical", "Billing", "Consultation", "Complaint", "Other"],
      default: "Technical"
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    adminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    superAdminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    tags: {
      type: [String],
      default: []
    },
    comments: {
      type: [commentSchema],
      default: []
    },
    forwardedToSuperAdmin: {
      type: Boolean,
      default: false
    },
    forwardedReason: {
      type: String
    }
  },
  { timestamps: true }
);

// Pre-save hook to generate ticket ID
ticketSchema.pre("save", function(next) {
  if (!this.isNew) return next();
  
  const now = new Date();
  const year = now.getFullYear();
  const count = Math.floor(Math.random() * 1000).toString().padStart(3, "0");
  this.ticketId = `TKT-${year}-${count}`;
  next();
});

module.exports = mongoose.model("Ticket", ticketSchema);