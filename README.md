# OG To-Do App

A production-ready, secure, and scalable task management system built with **Node.js, Express, and MongoDB**.

---

## 🚀 Features
- User authentication with JWT
- Password hashing with bcrypt
- Create, read, update, and delete tasks
- User-specific data isolation
- Input validation and error handling
- Optional: password reset and email verification

---

## 🧠 Architecture
Client (React) → API Gateway (Express Routes + Middleware) → Business Logic (Controllers + Services) → Data Layer (MongoDB + Mongoose)

---

## 🏗️ Folder Structure
```bash
project/
├── models/
│ ├── User.js
│ └── Task.js
├── controllers/
│ ├── authController.js
│ └── taskController.js
├── middleware/
│ ├── authMiddleware.js
│ ├── errorHandler.js 
│ └── validate.js
├── routes/
│ ├── authRoutes.js
│ └── taskRoutes.js
├── config/
│ └── db.js
├── utils/
│ ├── generateToken.js
│ └── validators.js
└── server.js
```

---

## ⚙️ Installation & Setup
1. Clone the repo  
   `git clone https://github.com/yourusername/og-todo-app.git`
2. Install dependencies  
   `npm install`
3. Create a `.env` file:
PORT=5000
MONGO_URI=your_mongo_uri
JWT_SECRET=your_secret
4. Run the server  
`npm run dev`

---

## 🧪 API Endpoints
| Method | Endpoint | Description | Auth Required |
|--------|-----------|--------------|---------------|
| POST | `/api/auth/register` | Register user | ❌ |
| POST | `/api/auth/login` | Login user | ❌ |
| GET | `/api/tasks` | Get all tasks | ✅ |
| POST | `/api/tasks` | Create task | ✅ |
| PUT | `/api/tasks/:id` | Update task | ✅ |
| DELETE | `/api/tasks/:id` | Delete task | ✅ |

---

## 🔐 Security Highlights
- Passwords hashed with bcrypt
- JWT authentication middleware
- Input validation with express-validator
- CORS configured for restricted origins
- Helmet and rate limiter enabled

---

## 🧾 Tech Stack
- **Backend:** Node.js, Express
- **Database:** MongoDB (Mongoose)
- **Frontend:** React (planned)
- **Deployment:** Render
- **Testing:** Postman

---

## 📈 Project Goals
- Practice full backend architecture
- Implement clean authentication flow
- Learn schema design and security best practices

---

## 👨‍💻 Author
**Gaius Okoase** – Backend Developer  
[LinkedIn](https://linkedin.com/in/gaius-okoase) | [GitHub](https://github.com/Gaius-Okoase)