import React, { useEffect, useState } from 'react';
import { ref, get, child } from 'firebase/database';
import { db, auth } from '../firebase';
import {
  Box,
  Typography,
  Paper,
  IconButton,
  Chip,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const nav = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      const user = auth.currentUser;
      if (!user) return;
      const snap = await get(child(ref(db), `orders/${user.uid}`));
      if (snap.exists()) {
        const data = snap.val();
        const orderList = Object.values(data);
        setOrders(orderList);
      }
    };
    fetchOrders();
  }, []);

  return (
    <Box sx={{ mt: '80px', px: 2 }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mb: 3,
          position: 'relative',
        }}
      >
        <IconButton
          onClick={() => nav(-1)}
          sx={{ position: 'absolute', left: 0 }}
        >
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          MyOrder
        </Typography>
      </Box>

      {orders.length === 0 ? (
        <Typography align="center">No orders found.</Typography>
      ) : (
        orders.map((order, i) => (
          <Paper
            key={i}
            sx={{
              p: 2,
              maxWidth: 400,
              mx: 'auto',
              mb: 2,
              display: 'flex',
              gap: 2,
              alignItems: 'center',
              border: '1px solid #eee',
            }}
          >
            <img
              src={order.items[0].images?.[0]}
              alt={order.items[0].title}
              width={80}
              height={80}
              style={{ borderRadius: 6, objectFit: 'cover' }}
            />
            <Box>
              <Typography noWrap>{order.items[0].title}</Typography>
              <Typography fontWeight="bold">
                ${order.items[0].price}
              </Typography>
              <Chip
                label={order.items[0].quantity}
                size="small"
                sx={{ mt: 1 }}
              />
            </Box>
          </Paper>
        ))
      )}
    </Box>
  );
};

export default Orders;