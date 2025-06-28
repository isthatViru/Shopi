import React, { useEffect, useState } from 'react';
import {
  Box,
  Drawer,
  Typography,
  IconButton,
  Divider,
  Button,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';

import { getCart, saveCart } from './cartUtils';
import { auth, db } from '../firebase';
import { ref, push } from 'firebase/database';
import { useNavigate } from 'react-router-dom';

import { useDrawer } from './DrawerContext'; // Make sure DrawerProvider wraps your App

const CartDrawer = () => {
  const [cartItems, setCartItems] = useState([]);
  const { cartVisible, setCartVisible } = useDrawer();
  const nav = useNavigate();

  useEffect(() => {
    const loadCart = async () => {
      const items = await getCart();
      setCartItems(items || []);
    };

    if (cartVisible && auth.currentUser) {
      loadCart();
    }
  }, [cartVisible]);

  const changeQuantity = (productId, action) => {
    const updated = cartItems.map((item) => {
      if (item.id === productId) {
        const qty = action === 'increment' ? item.quantity + 1 : item.quantity - 1;
        return { ...item, quantity: Math.max(1, qty) };
      }
      return item;
    });
    setCartItems(updated);
    saveCart(updated);
  };

  const removeFromCart = (productId) => {
    const updated = cartItems.filter((item) => item.id !== productId);
    setCartItems(updated);
    saveCart(updated);
  };

  const getTotalPrice = () =>
    cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);

  const handleCheckout = async () => {
    if (!auth.currentUser) return;

    const user = auth.currentUser;
    const orderRef = ref(db, `orders/${user.uid}`);

    const newOrder = {
      items: cartItems,
      placedAt: Date.now(),
    };

    await push(orderRef, newOrder);
    await saveCart([]);
    setCartItems([]);
    setCartVisible(false);
    nav('/orders');
  };

  if (!auth.currentUser) {
    return (
      <Drawer anchor="right" open={cartVisible} onClose={() => setCartVisible(false)}>
        <Box sx={{ width: 350, p: 2 }}>
          <Typography variant="h6">Please log in to view your cart.</Typography>
        </Box>
      </Drawer>
    );
  }

  return (
    <Drawer anchor="right" open={cartVisible} onClose={() => setCartVisible(false)}>
      <Box sx={{ width: 350, p: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6">My Order</Typography>
          <IconButton onClick={() => setCartVisible(false)}><CloseIcon /></IconButton>
        </Box>

        {cartItems.length === 0 ? (
          <Typography sx={{ mt: 4, textAlign: 'center' }}>Your cart is empty.</Typography>
        ) : (
          cartItems.map((item) => (
            <Box key={item.id} sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
              <img
                src={item.images?.[0]}
                alt={item.title}
                width={60}
                height={60}
                style={{ borderRadius: 6, objectFit: 'cover' }}
              />
              <Box sx={{ flex: 1, mx: 1 }}>
                <Typography variant="body2" noWrap>{item.title}</Typography>
                <Typography fontWeight="bold">${item.price}</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                  <IconButton size="small" onClick={() => changeQuantity(item.id, 'decrement')}>
                    <RemoveIcon fontSize="small" />
                  </IconButton>
                  <Typography>{item.quantity}</Typography>
                  <IconButton size="small" onClick={() => changeQuantity(item.id, 'increment')}>
                    <AddIcon fontSize="small" />
                  </IconButton>
                </Box>
              </Box>
              <IconButton onClick={() => removeFromCart(item.id)}>
                <DeleteIcon />
              </IconButton>
            </Box>
          ))
        )}

        <Divider sx={{ my: 2 }} />

        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography>Total:</Typography>
          <Typography fontWeight="bold">${getTotalPrice()}</Typography>
        </Box>

        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 2 }}
          onClick={handleCheckout}
        >
          Checkout
        </Button>
      </Box>
    </Drawer>
  );
};

export default CartDrawer;
