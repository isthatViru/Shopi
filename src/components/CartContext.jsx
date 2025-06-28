// src/components/CartContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import { getCart, saveCart } from './cartUtils';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const load = async () => {
      const c = await getCart();
      setCart(c || []);
    };
    load();
  }, []);

  const addToCart = (product) => {
    const exists = cart.find((item) => item.id === product.id);
    let updated;
    if (exists) {
      updated = cart.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      updated = [...cart, { ...product, quantity: 1 }];
    }
    setCart(updated);
    saveCart(updated);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, setCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
