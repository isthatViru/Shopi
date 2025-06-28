// src/components/Clothes.jsx
import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Chip,
  IconButton,
  Skeleton,
  TextField,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import { useCart } from './CartContext';
import { useDrawer } from './DrawerContext';

const Clothes = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  const { addToCart } = useCart();
  const { setCartVisible } = useDrawer();

  useEffect(() => {
    const fetchClothes = async () => {
      try {
        const res = await axios.get('https://api.escuelajs.co/api/v1/categories/1/products');
        setData(res.data);
      } catch (err) {
        console.error('Failed to load clothes:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchClothes();
  }, []);

  const filteredData = data.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const SkeletonCards = () =>
    Array.from({ length: 8 }).map((_, i) => (
      <Box key={i} sx={{ width: '300px' }}>
        <Card sx={{ borderRadius: 2 }}>
          <Skeleton variant="rectangular" height={200} />
          <CardContent>
            <Skeleton height={20} width="80%" sx={{ mb: 1 }} />
            <Skeleton height={20} width="40%" />
          </CardContent>
        </Card>
      </Box>
    ));

  return (
    <Box sx={{ mt: '80px', px: 2 }}>
      <Container maxWidth="lg">
        <Box sx={{ mb: 5, textAlign: 'center' }}>
          <Typography variant="h5" color="black" mb={2}>
            Clothes
          </Typography>
          <TextField
            placeholder="Search a product"
            variant="outlined"
            sx={{ width: '300px' }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: 3,
          }}
        >
          {loading
            ? SkeletonCards()
            : filteredData.map((product) => (
                <Box key={product.id} sx={{ width: '300px' }}>
                  <Card sx={{ borderRadius: 2, overflow: 'hidden', position: 'relative' }}>
                    <CardMedia
                      component="img"
                      image={product.images?.[0]}
                      alt={product.title}
                      sx={{ height: 200, objectFit: 'cover' }}
                    />
                    <Chip
                      label={product.category?.name}
                      size="small"
                      sx={{
                        position: 'absolute',
                        top: 7,
                        left: 8,
                        backgroundColor: '#f5f5f5',
                        fontSize: '12px',
                      }}
                    />
                    <IconButton
                      sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        background: 'white',
                      }}
                      onClick={() => {
                        addToCart(product);
                        setCartVisible(true);
                      }}
                    >
                      <AddIcon />
                    </IconButton>
                    <CardContent sx={{ px: 1.5, py: 1 }}>
                      <Typography variant="body2" noWrap>
                        {product.title}
                      </Typography>
                      <Typography variant="subtitle2" fontWeight="bold">
                        {product.price}$
                      </Typography>
                    </CardContent>
                  </Card>
                </Box>
              ))}
        </Box>
      </Container>
    </Box>
  );
};

export default Clothes;
