import React from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';

const FeatureSection = ({ title, description, imageSrc, imagePosition = 'left' }) => {
  return (
    <Box sx={{ py: 8 }}>
      <Container>
        {/* This Box is now the flex container, just like your example */}
        <Box 
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            flexDirection: { 
              xs: 'column', 
              md: imagePosition === 'left' ? 'row' : 'row-reverse' 
            },
            gap: 4,
          }}
        >
          {/* Image Box */}
          <Box sx={{ flex: 1, maxWidth: 400 }}>
            <Box 
              component="img" 
              src={imageSrc} 
              alt={title} 
              sx={{ width: '100%', display: 'block' }} 
            />
          </Box>
          
          {/* Text Box */}
          <Box sx={{ flex: 1, textAlign: { xs: 'center', md: 'left' } }}>
            <Typography variant="h4" component="h2" gutterBottom>
              {title}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {description}
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default FeatureSection;