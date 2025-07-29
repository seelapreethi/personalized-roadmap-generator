# 🧠 Personalized Learning Roadmap Generator

A full-stack web application that allows users to generate and manage a personalized learning roadmap. Users can register, log in, and create custom study tasks with deadlines and notes. Built using the MERN (MongoDB, Express, React, Node.js) stack.

---

## 🚀 Features

- ✅ User Authentication (Register/Login using JWT)
- ✅ Protected Routes (Only accessible with valid token)
- ✅ Task Management (Add, View, Delete tasks)
- ✅ User-specific Dashboards
- ✅ MongoDB database integration
- ✅ Responsive Frontend with React

---

## 🛠️ Tech Stack

| Layer       | Technology             |
|-------------|------------------------|
| Frontend    | React.js, TailwindCSS  |
| Backend     | Node.js, Express.js    |
| Database    | MongoDB Atlas          |
| Auth        | JWT (JSON Web Token)   |
| Tools       | Git, GitHub, Postman   |
| Hosting     | (optional) Render, Vercel |

---

## 📁 Project Structure

```
project-root/
├── client/              # React frontend
│   ├── src/
│   ├── public/
│   └── README.md
├── server/              # Express backend
│   ├── config/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── server.js
├── .gitignore
├── README.md            # (You are here)
└── package.json
```

---

## ⚙️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo
```

### 2. Setup Backend

```bash
cd server
npm install
```

#### ➕ Create a `.env` file in `server/` and add:

```
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```

```bash
npm start
```

### 3. Setup Frontend

```bash
cd client
npm install
npm start
```

---

## 🧪 API Endpoints (Test with Postman)

| Method | Endpoint          | Description                   |
|--------|-------------------|-------------------------------|
| POST   | /api/register     | Register a new user           |
| POST   | /api/login        | Log in and get JWT token      |
| GET    | /api/protected    | Access protected route        |
| GET    | /api/tasks        | Get tasks for logged-in user  |
| POST   | /api/tasks        | Create a new task             |
| DELETE | /api/tasks/:id    | Delete a task by ID           |

🛡️ **Note**: For protected routes, send the JWT token in the headers:

```
Authorization: Bearer <your_token>
```

---

## 🙋 Author

Made by **Preethi S**  
GitHub: [https://github.com/seelapreethi](https://github.com/seelapreethi)

---

## 📄 License

This project is licensed under the **MIT License**.
