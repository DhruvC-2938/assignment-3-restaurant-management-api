# Restaurant Management API

A RESTful backend API for managing restaurants, menus, and user authentication built with **Node.js**, **Express**, and **MongoDB (Mongoose)**.

---

## Features

- **Authentication & Authorization**: User registration and login using bcrypt for password hashing and JSON Web Tokens (JWT) for secure route protection.
- **Restaurant Management**: Full CRUD (Create, Read, Update, Delete) operations for restaurant profiles.
- **Menu Management**: Manage menu items associated with specific restaurants.
- **Data Validation & Error Handling**: Request payload validation and structured error responses.

---

## Tech Stack

- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express.js](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) via [Mongoose](https://mongoosejs.com/)
- **Security**: [bcryptjs](https://www.npmjs.com/package/bcryptjs) (password hashing), [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) (JWT)
- **Environment Management**: [dotenv](https://www.npmjs.com/package/dotenv)

---

## Deployed Link 
- https://assignment-3-restaurant-management-api-2.onrender.com

---

## Project Structure

```text
restaurant_management_api/
├── middleware/
│   ├── authMiddleware.js    # JWT verification middleware
│   └── logger.js            # Request logging middleware
├── models/
│   ├── MenuItem.js          # Menu item schema
│   ├── Restaurant.js        # Restaurant schema
│   └── User.js              # User schema
├── routes/
│   ├── authRoutes.js        # /register & /login routes
│   ├── menuRoutes.js        # Menu management routes
│   └── restaurantRoutes.js  # Restaurant CRUD routes
├── .env.example             # Template for environment variables
├── .gitignore               # Files excluded from git
├── package.json             # Project metadata and dependencies
├── README.md                # Documentation
└── server.js                # Main application entry point
```

---

## Getting Started

### 1. Prerequisites
- [Node.js](https://nodejs.org/) (v16 or later recommended)
- [MongoDB](https://www.mongodb.com/) running locally or a [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) connection URI

### 2. Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/<YOUR_GITHUB_USERNAME>/assignment-3-restaurant-management-api.git
   cd assignment-3-restaurant-management-api
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### 3. Environment Configuration

Create a `.env` file in the root directory:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/restaurant_db
JWT_SECRET=your_jwt_secret_key_here
```

### 4. Running the Application

Start the server:
```bash
npm start
```
Or run directly:
```bash
node server.js
```

The server will start on `http://localhost:5000` (or your configured `PORT`).

---

## API Endpoints

### 1. Authentication Routes

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `POST` | `/register` | Register a new user | No |
| `POST` | `/login` | Authenticate user and return JWT token | No |

#### `POST /register`
**Request Body:**
```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "password123"
}
```

#### `POST /login`
**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```
**Response:**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### 2. Restaurant Routes

> **Note**: For protected routes, include the JWT token in the Authorization header:  
> `Authorization: Bearer <your_token>`

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `GET` | `/restaurants` | Get all restaurants | No |
| `GET` | `/restaurants/:id` | Get single restaurant by ID | No |
| `POST` | `/restaurants` | Create a new restaurant | **Yes** |
| `PUT` | `/restaurants/:id` | Update restaurant details | **Yes** |
| `DELETE` | `/restaurants/:id` | Delete a restaurant | **Yes** |

#### `POST /restaurants`
**Request Body:**
```json
{
  "name": "The Gourmet Spot",
  "city": "New York",
  "address": "123 Broadway St",
  "cuisine": "Italian",
  "rating": 4.5
}
```

---

### 3. Menu Routes

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `GET` | `/restaurants/:id/menu` | Get all menu items for a restaurant | No |
| `POST` | `/restaurants/:id/menu` | Add a new menu item to a restaurant | **Yes** |
| `PUT` | `/menu/:id` | Update a menu item by ID | **Yes** |
| `DELETE` | `/menu/:id` | Delete a menu item by ID | **Yes** |

#### `POST /restaurants/:id/menu`
**Request Body:**
```json
{
  "name": "Margherita Pizza",
  "price": 14.99,
  "isAvailable": true
}
```

---
