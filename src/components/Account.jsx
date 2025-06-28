import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { auth } from '../firebase';

const Account = () => {
  const user = auth.currentUser;

  return (
    <Box
      sx={{
        mt: '80px',
        px: 2,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '60vh',
      }}
    >
      <Paper elevation={3} sx={{ p: 4, width: '100%', maxWidth: 400 }}>
        <Typography variant="h6" gutterBottom>
          My Account
        </Typography>

        {user ? (
          <>
            <Typography variant="body1">
              <strong>Email:</strong> {user.email}
            </Typography>
            <Typography variant="body2" sx={{ mt: 2 }}>
              You're currently logged in.
            </Typography>
          </>
        ) : (
          <Typography variant="body2" color="error">
            You are not logged in.
          </Typography>
        )}
      </Paper>
    </Box>
  );
};

export default Account;
