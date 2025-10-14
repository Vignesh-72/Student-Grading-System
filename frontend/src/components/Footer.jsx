import React from 'react';
import { Box, Container, Typography, Link, IconButton } from '@mui/material';
import { GitHub, Twitter } from '@mui/icons-material';

const Footer = () => {
  return (
    <Box component="footer" sx={{ py: 4, px: 2, backgroundColor: (theme) =>
        theme.palette.mode === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
      }}>
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
          <IconButton aria-label="github" component={Link} href="https://github.com/Vignesh-72/Student-Grading-System" target="_blank" sx={{ mx: 1 }}>
            <GitHub />
          </IconButton>
        </Box>
        <Typography variant="body2" color="text.secondary" align="center">
          {'© '}
          {new Date().getFullYear()} Student Grading System
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;