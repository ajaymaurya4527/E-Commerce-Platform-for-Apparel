# MauryaShop - Full Stack MERN E-Commerce Platform

MauryaShop is a fully responsive, modern clothing and apparel e-commerce web application built using the MERN stack (MongoDB, Express.js, React.js, Node.js), styled with Tailwind CSS, and optimized with TypeScript-ready structuring. It features a complete multi-step client checkout experience and a dedicated Admin Panel dashboard for seamless store orchestration.

---

## 🚀 Features

### 🛒 Frontend Storefront
- **Dynamic Collection Gallery:** Browse comprehensive apparel product lists with modern image hover transitions.
- **Advanced Filtering & Sorting:** Real-time client-side filter mechanics sorted by category (Men, Women, Kids), sub-categories (Topwear, Bottomwear, Winterwear), and price dynamics (Low to High / High to Low).
- **Global Search:** Immediate interactive search component querying live product listings.
- **Product Details Page:** Comprehensive view containing responsive thumbnail selection galleries, explicit size selectors, detailed descriptions, and structured related-items recommendations.
- **Robust Cart Lifecycle:** Persistent item grouping state management handling custom selected sizing structures.
- **Optimized Checkout & Payments:** Fully operational multi-step delivery information collection integrated with **Cash on Delivery (COD)** and secure **Stripe API** payment gateways.

### 🛡️ Admin Dashboard
- **Product Publishing Engine:** Interface offering multi-image file uploads via Cloudinary storage, dynamic form controls for title description, sizing configurations, specific pricing parameters, and direct "Bestseller" flags.
- **Catalog Management:** Unified records tracking complete items in the database with rapid single-click removal properties.
- **Orders Control Center:** Real-time updates showcasing purchase details, detailed shipping address payloads, active payment states, and modular status controls (e.g., *Order Placed*, *Packing*, *Shipped*, *Out for delivery*, *Delivered*).

---

## 🛠️ Architecture & Tech Stack

- **Frontend:** React.js, React Router DOM, Tailwind CSS, Axios, React Toastify
- **Backend Infrastructure:** Node.js, Express.js, JSON Web Tokens (JWT), Bcrypt.js
- **Database Model:** MongoDB Atlas via Mongoose ODM Object Mapping
- **Cloud Assets Management:** Cloudinary API for production image media persistence
- **Payment Processing:** Stripe Node SDK Integration

---

## 📂 Project Structure

```text
MauryaShop/
├── admin/                  # React Vite Admin Dashboard Platform
│   ├── src/
│   │   ├── components/     # Navbar, Sidebar components
│   │   ├── pages/          # Add Product, List Products, Orders Management
│   │   └── assets/         # Dashboard visual media packs
├── backend/                # Node.js Express Core API Engine
│   ├── config/             # Database connectivity & Cloudinary setup
│   ├── controllers/        # User, Product, Cart, and Order Route Handlers
│   ├── middleware/         # Auth verification guards (User & Admin)
│   ├── models/             # Mongoose Schemas (User, Product, Order)
│   └── routes/             # REST Endpoints
└── frontend/               # React Vite Consumer E-Commerce Storefront
    ├── src/
    │   ├── components/     # Navbar, Hero, LatestCollection, ProductItem, Title, CartTotal
    │   ├── context/        # ShopContext (Global State Management, Cart actions, API handlers)
    │   ├── pages/          # Home, Collection, Product, Cart, PlaceOrder, Orders, Login
    │   └── assets/         # App logos, promotional banners, UI icons
