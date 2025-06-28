// src/components/All.jsx
import React, { useEffect, useState } from 'react';
import {
  Card, CardContent, CardMedia, Typography,
  IconButton, Chip, Box, TextField, Skeleton, Container
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import { saveCart, getCart } from './cartUtils';
import { useDrawer } from './DrawerContext';
import { auth } from '../firebase';

const All = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const { setCartVisible } = useDrawer();

  useEffect(() => {
    axios.get('https://api.escuelajs.co/api/v1/products')
      .then(res => setProducts(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleAdd = async (product) => {
    if (!auth.currentUser) return alert('Please login first!');
    const current = await getCart();
    const exists = current.find((i) => i.id === product.id);
    const updated = exists
      ? current.map((i) => i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i)
      : [...current, { ...product, quantity: 1 }];
    await saveCart(updated);
    setCartVisible(true);
  };

  const filtered = products.filter((p) =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ mt: '80px', px: 2 }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h5">All Products</Typography>
          <TextField
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search..."
            sx={{ mt: 2, width: 300 }}
          />
        </Box>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 3 }}>
          {loading
            ? Array(8).fill(0).map((_, i) => (
                <Skeleton key={i} variant="rectangular" width={300} height={200} />
              ))
            : filtered.map((product) => (
                <Card key={product.id} sx={{ width: 300 }}>
                  <Box sx={{ position: 'relative' }}>
                    <CardMedia component="img" height="200" image={product.images?.[0]} alt={product.title} />
                    <Chip label={product.category?.name} size="small" sx={{ position: 'absolute', bottom: 8, left: 8 }} />
                    <IconButton
                      onClick={() => handleAdd(product)}
                      sx={{ position: 'absolute', top: 8, right: 8, background: 'white' }}
                    >
                      <AddIcon />
                    </IconButton>
                  </Box>
                  <CardContent>
                    <Typography variant="body2" noWrap>{product.title}</Typography>
                    <Typography variant="subtitle2" fontWeight="bold">${product.price}</Typography>
                  </CardContent>
                </Card>
              ))}
        </Box>
      </Container>
    </Box>
  );
};

export default All;
