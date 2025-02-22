# Capstone StoreFleet Project 🚀

StoreFleet is a **MERN stack-based** capstone project designed to manage and track store inventory efficiently. It includes authentication, inventory management, user roles, and real-time updates.


## 🛠 Tech Stack
- **Backend:** Node.js, Express.js, MongoDB, Mongoose

## 📁 Folder Structure

```plaintext
Capstone-StoreFleet/
│
├── server/             # Backend
│   ├── config/         # Database and authentication config
│   ├── controllers/    # Route controllers
│   ├── models/        # Mongoose Models (User, Inventory)
│   ├── routes/        # Express Routes
│   ├── middlewares/   # Auth and error handling
│   ├── utils/         # Utility functions
│   ├── server.js      # Main backend entry point
│   ├── package.json
│
└── README.md           # Project Documentation
```

## 🔧 Installation

Clone the repository:
```bash
git clone https://github.com/ajaykumar2pp/Capstone-StoreFleet.git
cd capstone-storefleet
```

Install dependencies:
```bash
# Install backend dependencies
cd  capstone-storefleet
npm install



## 🚀 Usage

Start the backend server:
```bash
cd capstone-storefleet
npm run dev
```

Open **http://localhost:3000** in your browser.

## 🔑 Environment Variables
Create a `.env` file in the `server/` directory and add:
```plaintext
PORT=3000  
MONGO_URI=your_mongodb_uri  
JWT_SECRET=your_jwt_secret  
JWT_EXPIRE=1d  
COOKIE_EXPIRES_IN=1  
SMPT_SERVICE=gmail
STORFLEET_SMPT_MAIL= google@gmail.com
STORFLEET_SMPT_MAIL_PASSWORD = 1234567895412
```

## 🛠 API Endpoints

### Auth Routes
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/google` - Google OAuth
- `GET /api/auth/github` - GitHub OAuth

### Inventory Routes
- `GET /api/inventory` - Fetch all items
- `POST /api/inventory` - Add new item
- `PUT /api/inventory/:id` - Update item
- `DELETE /api/inventory/:id` - Delete item

## 📸 Screenshots

> Add screenshots here if needed

## 📜 License
This project is licensed under the **MIT License**.
