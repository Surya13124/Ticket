Mobile-Friendly Support Ticket App
Overview
A responsive full-stack web application to create, view, update, and delete support tickets. The app is mobile-first, featuring priority and status badges for quick visual identification, and a clean, intuitive UI for both mobile and desktop users.
Features
•	Mock Login & Signup
•	Create new tickets with Title, Description, and Priority
•	View all tickets in a responsive grid
•	Update ticket status (Open, In Progress, Closed)
•	Delete tickets
•	Mobile-first responsive design with Bootstrap 5
•	Color-coded badges for Priority and Status
•	Full CRUD functionality via RESTful API
Tech Stack
•	Frontend: React.js, Bootstrap 5
•	Backend: Node.js, Express.js
•	Database: PostgreSQL
•	State Management: React useState and useEffect
•	Optional: Docker & Docker Compose
•	Optional: GitHub Actions CI/CD pipeline
•	Deployment: Can be deployed on Render, Railway, or Vercel
Project Structure
client/
  ├── src/
  │   ├── Components/
  │   │   ├── LoginSignup.jsx
  │   │   └── InputTicket.jsx
  │   └── App.js
  └── package.json
server/
  ├── db.js          # PostgreSQL connection
  ├── index.js       # Express server and API endpoints
  └── package.json
Database Schema
tickets
Field	Type
id	Serial
title	VARCHAR
description	TEXT
priority	ENUM (Low, Medium, High)
status	ENUM (Open, In Progress, Closed)
created_at	TIMESTAMP
API Endpoints
•	POST /tickets – Create a new ticket
•	GET /tickets – Get all tickets
•	PUT /tickets/:id – Update a ticket (status)
•	DELETE /tickets/:id – Delete a ticket
Setup Instructions
Backend
1.	Navigate to the backend folder:
 	cd server
2.	Install dependencies:
 	npm install
3.	Configure PostgreSQL connection in db.js
4.	Run the server:
 	nodemon start
 	Backend runs at http://localhost:5000.
Frontend
1.	Navigate to the frontend folder:
 	cd client
2.	Install dependencies:
 	npm install
3.	Start the React app:
 	npm start
 	Frontend runs at http://localhost:3000.
 	
Screenshots
      ![Login](images/Screenshot%202025-08-22%20171530.png)
      ![Tickets](images/Screenshot%202025-08-22%20171754.png)
      ![Create](images/Screenshot%202025-08-22%20171806.png)

Author
Balasurya, Madras Christian College
