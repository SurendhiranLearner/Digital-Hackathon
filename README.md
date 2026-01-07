# Digitalflake Dashboard - Hackathon

A full-stack dashboard application built for the Digitalflake Hackathon.

## Live Demo
[Check out the Live Application here!](https://mighty-spoons-unite.loca.lt)

## Features
- **User Authentication**: Secure Login/Register with JWT.
- **Global Table**: Responsive data table with ID, Name, Email, and Status.
- **CRUD Operations**: Add, Edit, and Delete records.
- **Single Port Serving**: Both Frontend (React) and Backend (Express) run on port 5000.
- **Tech Stack**: Node.js, Express, MongoDB, React, Tailwind CSS, TypeScript.

## How to Run Locally

1. **Clone the Repo**:
   ```bash
   git clone https://github.com/SurendhiranLearner/Digital-Hackathon.git
   ```

2. **Setup Backend**:
   - Go to `server/`
   - Run `npm install`
   - Create a `.env` file with `PORT=5000`, `MONGO_URI`, and `JWT_SECRET`.
   - Run `npm run dev`

3. **Setup Frontend**:
   - Go to `client/`
   - Run `npm install`
   - Run `npm run build`

4. **Access**:
   - Open `http://localhost:5000`

---
