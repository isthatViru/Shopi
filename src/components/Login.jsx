import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import {
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  InputAdornment,
  IconButton,
  Alert,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router-dom';

const Access = () => {
  const [u, setU] = useState('');
  const [p, setP] = useState('');
  const [v, setV] = useState(false);
  const [e, setE] = useState('');
  const nav = useNavigate();

  const go = async () => {
    try {
      await signInWithEmailAndPassword(auth, u, p);
      nav('/');
    } catch (err) {
      setE(err.message);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        px: 2,
        marginLeft: 65,
      }}
    >
      <Paper elevation={3} sx={{ p: 4, width: '100%', maxWidth: 400 }}>
        <Typography variant='h5' align='center' gutterBottom>
          Login
        </Typography>

        {e && <Alert severity='error' sx={{ mb: 2 }}>{e}</Alert>}

        <TextField
          label='Email'
          type='email'
          fullWidth
          margin='normal'
          value={u}
          onChange={(e) => setU(e.target.value)}
        />

        <TextField
          label='Password'
          type={v ? 'text' : 'password'}
          fullWidth
          margin='normal'
          value={p}
          onChange={(e) => setP(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton onClick={() => setV(!v)} edge='end'>
                  {v ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Button variant='contained' fullWidth sx={{ mt: 2 }} onClick={go}>
          Sign In
        </Button>
      </Paper>
    </Box>
  );
};

export default Access;