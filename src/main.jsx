import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from './components/CartContext';
import { DrawerProvider } from './components/DrawerContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <CartProvider>
    <DrawerProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </DrawerProvider>
  </CartProvider>
);
