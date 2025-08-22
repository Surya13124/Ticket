const express = require("express")
const app = express()
const cors = require("cors")
const pool = require("./db")

app.use(cors());
app.use(express.json());

app.post("/tickets", async (req, res) => {
  try {
    const { title, description, priority } = req.body;

    const newTicket = await pool.query(
      "INSERT INTO tickets (title, description, priority) VALUES ($1, $2, $3) RETURNING *",
      [title, description, priority]
    );

    res.json(newTicket.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});


app.get("/tickets", async (req, res) => {
  try {
    const allTickets = await pool.query("SELECT * FROM tickets");
    res.json(allTickets.rows);
  } catch (error) {
    console.error(error.message);
  }
});

app.get("/tickets/:id", async (req, res) => {
  try {
    const {id}= req.params; 
    const Ticket = await pool.query("SELECT * FROM tickets where id = $1",[id]);
    res.json(Ticket.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

app.put("/tickets/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { priority, status } = req.body;

    const updatedTicket = await pool.query(
      "UPDATE tickets SET priority = $1, status = $2 WHERE id = $3 RETURNING *",
      [priority, status, id]
    );

    res.json(updatedTicket.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

app.delete("/tickets/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deleteTicket = await pool.query(
      "DELETE FROM tickets WHERE id = $1 RETURNING *",
      [id]
    );
    res.json({ message: "Ticket deleted successfully", deleted: deleteTicket.rows[0] });
  } catch (error) {
    console.error(error.message);
  }
});


app.listen(5000, ()=> {
    console.log("Server has started");
})