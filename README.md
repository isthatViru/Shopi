# 🛍️ E-Commerce React App

This is a simple **e-commerce website** built using **React**, **Firebase Authentication**, and **Firebase Realtime Database**. Users can browse products, add them to the cart, place orders, and view their order history.

---

## ✨ Features

- 🔐 User Authentication (Signup / Login using Firebase)
- 🛒 Add to Cart with quantity control
- ✅ Checkout functionality that stores order history in Firebase
- 📦 View previous orders in the “My Orders” section
- 🔍 Search products within categories
- 📱 Fully responsive layout with Drawer support on mobile

---

## 🧰 Tech Stack

- React + React Router
- Material UI
- Firebase Authentication
- Firebase Realtime Database
- Axios for API requests

---

## 🚀 Live Demo

> _You can deploy this project using Vercel or Netlify and paste the link here_

---

## 🛠️ Setup Instructions

1. **Clone the Repository**

```bash
git clone https://github.com/your-username/ecommerce-react-app.git
cd ecommerce-react-app
```

2. **Install Dependencies**

```bash
npm install
```

3. **Setup Firebase**

- Go to [Firebase Console](https://console.firebase.google.com/)
- Create a project
- Enable **Authentication** (Email/Password)
- Setup **Realtime Database** and copy the credentials

4. **Update Firebase Config**

Replace the values inside `src/firebase.js` with your actual Firebase config:

```js
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  databaseURL: "https://YOUR_PROJECT_ID.firebaseio.com",
  ...
};
```

5. **Start the Project**

```bash
npm start
```

The app will start running at: `http://localhost:3000`

---

## 📁 Folder Structure

```
src/
│
├── components/
│   ├── Navbar.jsx
│   ├── Clothes.jsx
│   ├── Electronics.jsx
│   ├── Furnitures.jsx
│   ├── Toys.jsx
│   ├── All.jsx
│   ├── CartDrawer.jsx
│   ├── CartContext.jsx
│   ├── DrawerContext.jsx
│   ├── Orders.jsx
│   └── cartUtils.js
│
├── firebase.js
├── App.js
└── index.js
```

---

## 🙋‍♂️ Author

- **Developer:** Viraj (a beginner exploring React & Firebase!)
- If you enjoyed building this, don’t forget to ⭐ the repo!
