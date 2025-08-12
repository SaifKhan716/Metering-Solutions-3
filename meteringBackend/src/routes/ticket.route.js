const express=require("express")
const { createTicket, getAllTickets, getTicketbyID, updateTicket, addCommentToTicket, stats } = require("../controller/ticketController")

const ticketRouter= express.Router()

ticketRouter.post("/create-ticket", createTicket)
ticketRouter.get("/all-ticket", getAllTickets)
ticketRouter.get("/ticket-by-id", getTicketbyID)
ticketRouter.patch("/update-ticket", updateTicket)

ticketRouter.post("/:id/comments", addCommentToTicket)
ticketRouter.delete("/delete-ticket/:id", createTicket)

// admin
ticketRouter.get("/stats", stats)


module.exports=ticketRouter