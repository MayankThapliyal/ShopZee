# ShopZee
Full stack project made for testing perspective using HTML, CSS and JS for frontend, Java and Springboot for backend and MySQL for database
---
# 🛒 MyShopProject – E-Commerce Website

An end-to-end e-commerce web application built with:
- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Java, Spring Boot
- **Database:** MySQL
---
## 📂 Project Structure

MyShopProject/
├── Frontend/ # All frontend code (HTML, CSS, JS)
├── Backend/ # Spring Boot backend project
├── database/
│ └── database_dump.sql # MySQL DB structure and data
└── README.md # Project documentation

---

## 🚀 Features
- User-friendly product catalog
- Add to cart, checkout, and order placement
- Coupon/discount system
- MySQL database integration
- RESTful backend APIs
- Responsive design

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/MayankThapliyal/ShopZee.git
cd ShopZee

2️⃣ Import the Database
Open MySQL Workbench or terminal.
Create a new database:
CREATE DATABASE ShopZeeDatabase;

Import database/database_dump.sql into myshopdb.

3️⃣ Configure the Backend
In Backend/src/main/resources/application.properties, update:

spring.datasource.url=jdbc:mysql://localhost:3306/myshopdb
spring.datasource.username=YOUR_MYSQL_USERNAME
spring.datasource.password=YOUR_MYSQL_PASSWORD

4️⃣ How to run the application
Step 1: Setup the database appropriately. Ensure MySQL service is running before starting backend.
Step 2: Go to the file ShopZeeApplication.java and run it as Java Application.
Step 3: Run the frontend using login.html file. 

📌 Notes
You won't be able to open any page other than login.html if you've not logged in.
Coupon functionality allows only one coupon per order.
You can modify discount rules in frontend's checkout.js.

Happy learning!!!
