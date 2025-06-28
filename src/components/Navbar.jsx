import React, { useEffect, useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { getCart } from './cartUtils';
import { useDrawer } from './DrawerContext';

const Navbar = () => {
  const isSmallScreen = useMediaQuery('(max-width:768px)');
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [user, setUser] = useState(null);
  const nav = useNavigate();
  const { setCartVisible } = useDrawer();

  const pages = [
    { name: 'All', route: '/' },
    { name: 'Clothes', route: '/clothes' },
    { name: 'Electronics', route: '/electronics' },
    { name: 'Furnitures', route: '/furnitures' },
    { name: 'Toys', route: '/toys' },
  ];

  const profilePages = [
    { name: 'My Orders', route: '/orders' },
    { name: 'My Account', route: '/account' },
  ];

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const updateCartCount = async () => {
    const cart = await getCart();
    const total = cart.reduce((sum, item) => sum + item.quantity, 0);
    setCartCount(total);
  };

  useEffect(() => {
    updateCartCount();
  }, []);

  const handleSignOut = async () => {
    await signOut(auth);
    setUser(null);
    nav('/');
  };

  return (
    <>
      <AppBar position="fixed" color="default">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            {!isSmallScreen && (
              <Typography
                variant="h6"
                sx={{
                  color: 'black',
                  fontWeight: 'bold',
                  fontSize: '15px',
                  pr: 1.5,
                  whiteSpace: 'nowrap',
                }}
              >
                Shopi
              </Typography>
            )}
            {pages.map(({ name, route }) => (
              <Button
                variant="text"
                key={name}
                component={Link}
                to={route}
                sx={{
                  color: 'black',
                  fontSize: '12px',
                  textTransform: 'none',
                  whiteSpace: 'nowrap',
                  minWidth: 'auto',
                  px: 0.8,
                  py: 0.5,
                }}
              >
                {name}
              </Button>
            ))}
          </Box>

          {isSmallScreen ? (
            <IconButton onClick={() => setDrawerVisible(true)} sx={{ color: 'black' }}>
              <AccountCircleIcon />
            </IconButton>
          ) : (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              {user ? (
                <>
                  <Typography variant="body2" sx={{ color: 'black' }}>
                    {user.email}
                  </Typography>
                  {profilePages.map(({ name, route }) => (
                    <Button
                      key={name}
                      component={Link}
                      to={route}
                      sx={{
                        color: 'black',
                        textTransform: 'none',
                        fontSize: '14px',
                      }}
                    >
                      {name}
                    </Button>
                  ))}
                  <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    onClick={handleSignOut}
                  >
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    component={Link}
                    to="/login"
                    variant="outlined"
                    size="small"
                  >
                    Login
                  </Button>
                  <Button
                    component={Link}
                    to="/signup"
                    variant="contained"
                    size="small"
                  >
                    Signup
                  </Button>
                </>
              )}
              <Button
                startIcon={<ShoppingCartOutlinedIcon />}
                onClick={() => {
                  setCartVisible(true);
                  updateCartCount();
                }}
              >
                {cartCount}
              </Button>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      {/* Small screen profile drawer */}
    <Drawer anchor="right" open={drawerVisible} onClose={() => setDrawerVisible(false)}>
  <Box sx={{ width: 250, p: 2 }}>
    {user ? (
      <>
        <Typography variant="body2" gutterBottom>{user.email}</Typography>
        <List>
          {profilePages.map(({ name, route }) => (
            <ListItem
              key={name}
              button
              component={Link}
              to={route}
              onClick={() => setDrawerVisible(false)}
            >
              <ListItemText primary={name} />
            </ListItem>
          ))}
          <ListItem>
            <Button
              variant="outlined"
              color="error"
              fullWidth
              onClick={() => {
                handleSignOut();
                setDrawerVisible(false);
              }}
            >
              Sign Out
            </Button>
          </ListItem>
        </List>
      </>
    ) : (
      <List>
        <ListItem
          button
          component={Link}
          to="/login"
          onClick={() => setDrawerVisible(false)}
        >
          <ListItemText primary="Login" />
        </ListItem>
        <ListItem
          button
          component={Link}
          to="/signup"
          onClick={() => setDrawerVisible(false)}
        >
          <ListItemText primary="Signup" />
        </ListItem>
      </List>
    )}

    <List>
      <ListItem key="cart">
        <Button
          startIcon={<ShoppingCartOutlinedIcon />}
          fullWidth
          onClick={() => {
            setCartVisible(true);
            updateCartCount();
            setDrawerVisible(false);
          }}
        >
          Cart ({cartCount})
        </Button>
      </ListItem>
    </List>
  </Box>
</Drawer>

    </>
  );
};

export default Navbar;