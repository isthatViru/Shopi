import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import CartDrawer from './components/CartDrawer';
import All from './components/All';
import Clothes from './components/Clothes';
import Electronics from './components/Electronics';
import Furnitures from './components/Furnitures';
import Toys from './components/Toys';
import Orders from './components/Orders';
import Account from './components/Account';
import Signup from './components/Signup';
import Login from './components/Login';

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<All />} />
        <Route path="/clothes" element={<Clothes />} />
        <Route path="/electronics" element={<Electronics />} />
        <Route path="/furnitures" element={<Furnitures />} />
        <Route path="/toys" element={<Toys />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/account" element={<Account />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
       
      </Routes>
      <CartDrawer />
    </>
  );
};

export default App;
