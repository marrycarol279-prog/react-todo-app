# React Todo App

A full-stack todo list application built with React on the frontend and Express + MongoDB on the backend, featuring JWT-based user authentication.

## Features

- User sign up and log in with JWT authentication
- Create, read, update, and delete todos
- Persistent storage with MongoDB
- REST API built with Express

## Tech Stack

**Frontend**
- React
- Vite

**Backend**
- Node.js
- Express
- MongoDB (Mongoose)
- JWT for authentication

## Project Structure

```
P_Project/
├── todo/           # React frontend
└── todobackend/    # Express + MongoDB backend
```

## Getting Started

### Prerequisites

- Node.js installed
- MongoDB instance (local or hosted, e.g. MongoDB Atlas)

### Backend Setup

```bash
cd todobackend
npm install
```

Create a `.env` file in `todobackend/` with your own values:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

Start the backend server:

```bash
npm start
```

### Frontend Setup

```bash
cd todo
npm install
npm run dev
```

The app will be available at `http://localhost:5173` (default Vite port).

## Environment Variables

> **Note:** Never commit your `.env` file. Make sure it's listed in `.gitignore` before pushing to a public repository.

## License

This project is for personal learning purposes.
