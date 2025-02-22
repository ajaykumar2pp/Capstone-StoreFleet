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

## Postman Collection
You can access the Postman collection for Store Fleet using the link below:

[Store Fleet Postman Collection](https://www.postman.com/solar-escape-571108/store-fleet/collection/itzxqph/storefleet)


## 🛠 API Endpoints

### **Auth Routes**
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### **User Routes**
- `GET /api/user/details` - Get User Details
- `GET /api/user/logout` - Logout User

## **Admin Routes**
- `GET /api/admin/allusers` - Get ALl Users (Admin only)
- `GET /api/admin/details/:id` - Get User Details (Admin only)
- `DELETE /api/admin/delete/:id` - Delete User (Admin only)
- `PUT /api/admin/update/:id` - Update User Role (Admin only)

### **Product Routes**
- `GET /api/products` - Get All Products
- `GET /api/details/:id` - Get Product Details
- `GET /api/reviews/:id` - Get All Reviews for a Product

### **Admin Product Routes**
- `POST /api/add` - Add New Product (Admin only)
- `PUT /api/update/:id` - Update Product (Admin only)
- `DELETE /api/delete/:id` - Delete Product (Admin only)

### **User Product Routes**
- `PUT /api/rate/:id` - Rate a Product
- `DELETE /api/review/delete` - Delete a Review

### **Order Routes**
- `POST /api/order/new` - Create a New Order

## 📜 License
This project is licensed under the **MIT License**.
