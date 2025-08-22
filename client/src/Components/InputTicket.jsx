import React, { useState, useEffect } from "react";

const InputTicket = () => {
  const [tickets, setTickets] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Low");
  const [createVisible, setCreateVisible] = useState(false);

  // Fetch tickets
  const getTickets = async () => {
    try {
      const response = await fetch("http://localhost:5000/tickets");
      const data = await response.json();
      setTickets(data);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getTickets();
  }, []);

  // Create ticket (POST)
  const handleCreate = async () => {
    if (!title.trim() || !description.trim()) return;

    try {
      const body = { title, description, priority, status: "Open" };
      const response = await fetch("http://localhost:5000/tickets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const newTicket = await response.json();
      setTickets([...tickets, newTicket]);
      setTitle("");
      setDescription("");
      setPriority("Low");
      setCreateVisible(false);
    } catch (err) {
      console.error(err.message);
    }
  };

  // Delete ticket
  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5000/tickets/${id}`, {
        method: "DELETE",
      });
      setTickets(tickets.filter((t) => t.id !== id));
    } catch (err) {
      console.error(err.message);
    }
  };

  // Update ticket status
  const handleStatusChange = async (id, newStatus) => {
    try {
      const ticket = tickets.find((t) => t.id === id);
      const body = { priority: ticket.priority, status: newStatus };

      const response = await fetch(`http://localhost:5000/tickets/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const updated = await response.json();
      setTickets(tickets.map((t) => (t.id === id ? updated : t)));
    } catch (err) {
      console.error(err.message);
    }
  };

  const getPriorityBadge = (priority) => {
    if (priority === "High") return "danger";
    if (priority === "Medium") return "warning text-dark";
    return "success";
  };

  const getStatusBadge = (status) => {
    if (status === "Open") return "primary";
    if (status === "In Progress") return "warning text-dark";
    return "secondary";
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="container-fluid py-4 bg-light min-vh-100">
      <div className="container">
        <button
          className="btn btn-primary mb-4"
          onClick={() => setCreateVisible(true)}
        >
          + Create New Ticket
        </button>

        {createVisible && (
          <div className="card shadow mb-4 border-0">
            <div className="card-header bg-primary text-light d-flex justify-content-between align-items-center">
              <h5 className="mb-0" >Create Ticket</h5>
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={() => setCreateVisible(false)}
              ></button>
            </div>
            <div className="card-body">
              <div className="mb-3">
                <label className="form-label">Title</label>
                <input
                  type="text"
                  className="form-control"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea
                  className="form-control"
                  rows="3"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>

              <div className="mb-3">
                <label className="form-label">Priority Level</label>
                <select
                  className="form-select"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>

              <button className="btn btn-primary w-100" onClick={handleCreate}>
                Submit Ticket
              </button>
            </div>
          </div>
        )}

        <h4 className="mb-3">Tickets</h4>
        {tickets.length === 0 && (
          <p className="text-muted fst-italic">No tickets yet.</p>
        )}

        <div className="row">
          {tickets.map((ticket) => (
            <div key={ticket.id} className="col-md-6 col-lg-4 mb-4">
              <div className="card shadow h-100 border-0">
                <div className="card-body">
                  <h5 className="card-title">{ticket.title}</h5>
                  <p className="card-text text-muted">{ticket.description}</p>
                  <div className="mb-2">
                    <span
                      className={`badge bg-${getPriorityBadge(
                        ticket.priority
                      )} me-2`}
                    >
                      {ticket.priority}
                    </span>
                    <span
                      className={`badge bg-${getStatusBadge(ticket.status)}`}
                    >
                      {ticket.status}
                    </span>
                  </div>

                  <div className="d-flex justify-content-between align-items-center mt-3">
                    <select
                      className="form-select form-select-sm"
                      style={{ width: "auto" }}
                      value={ticket.status}
                      onChange={(e) =>
                        handleStatusChange(ticket.id, e.target.value)
                      }
                      disabled={ticket.status === "Closed"}
                    >
                      <option>Open</option>
                      <option>In Progress</option>
                      <option>Closed</option>
                    </select>

                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleDelete(ticket.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <div className="card-footer text-muted small">
                  Ticket ID: {ticket.id} <br />
                  Created At:{" "}
                  {ticket.created_at ? formatDate(ticket.created_at) : "N/A"}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InputTicket;
