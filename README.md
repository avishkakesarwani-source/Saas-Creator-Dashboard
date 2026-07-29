# 🚀 SaaS Creator Analytics & Post Dashboard

A full-stack web application built for content creators to manage posts, track analytics, and persist data in a relational MySQL database without page reloads (Asynchronous UI).

---

## 🛠️ Tech Stack

- **Frontend:** HTML5, CSS3, JavaScript (Vanilla JS, Fetch API, DOM Manipulation)
- **Backend:** Node.js, Express.js, CORS
- **Database:** MySQL (Relational Database with Connection Pooling via `mysql2`)

---

## ✨ Features

- 📊 **Dynamic Analytics Cards:** Real-time calculation and display of total posts and total views.
- ➕ **Add New Posts:** Interactive modal form to insert post details seamlessly.
- 🗑️ **Delete Posts:** Live removal of post records from both Database and Dashboard UI.
- ⚡ **Zero Page Reloads:** Asynchronous CRUD operations using native JavaScript `fetch()` API.
- 🗄️ **Database Persistence:** MySQL integration ensures records remain intact on page refreshes.

---

## 🚀 Local Setup & Installation

### 1. Prerequisites
Make sure you have the following installed on your system:
- [Node.js](https://nodejs.org/) (v14 or higher)
- [MySQL Workbench / Server](https://www.mysql.com/)

---

### 2. Database Configuration
Open MySQL Workbench or Terminal and execute the following SQL commands to set up the database schema:

```sql
CREATE DATABASE IF NOT EXISTS saas_dashboard;
USE saas_dashboard;

CREATE TABLE IF NOT EXISTS posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    release_date DATE,
    views INT DEFAULT 0,
    status VARCHAR(50) DEFAULT 'Draft',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 3. Application Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/YOUR_USERNAME/saas-creator-dashboard.git
   cd saas-creator-dashboard

2.nstall dependencies:
npm install

3.Configure Database Credentials:
Open server.js and update your local MySQL connection settings:
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'YOUR_MYSQL_PASSWORD',
    database: 'saas_dashboard'
});
4.Start the Server:
node server.js

5.Access the App:
Open your browser and navigate to http://localhost:8080

## 🔌 API Endpoints
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| GET | /api/posts | Fetches all posts sorted by newest first |
| POST | /api/posts | Inserts a new post or bulk array of posts into MySQL |
| DELETE | /api/posts/:id | Deletes a specific post by ID |