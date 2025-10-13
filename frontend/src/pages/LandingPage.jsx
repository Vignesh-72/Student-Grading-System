import React from 'react';
import { Box, Button, Container, Typography, AppBar, Toolbar } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import FeatureSection from '../components/FeatureSection';
import Footer from '../components/Footer';
import TextType from '../components/TextType';
import TextPressure from '../components/TextPressure';
import BlurText from '../components/BlurText';
import { motion } from 'framer-motion'; 
import CardSwap,{Card} from '../components/CardSwap';

const LandingPage = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const cardStyle1 = {
  backgroundImage: 'url(/img/png/waving.png)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  color: 'white',
  padding: '16px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-end',
};

const cardStyle2 = {
  ...cardStyle1,
  backgroundImage: 'url(/img/png/developer.png)',
};

const cardStyle3 = {
  ...cardStyle1,
  backgroundImage: 'url(/img/png/12.png)',
};
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <AppBar position="static" color="transparent" elevation={0} >
        <Toolbar sx={{ pr: 8 }} >
          <Box sx={{ flexGrow: 1 }} >
            
            <TextPressure
              text="Student Grading System"
              flex={false}
              textColor={theme.palette.text.primary}
              minFontSize={20}
            />
          </Box>
          <Button color="inherit" onClick={() => navigate('/login')} style={{marginRight:"30px"}}>
            Login          
          </Button>
        </Toolbar>
      </AppBar>
      
      {/* Hero Section */}
      <Box sx={{ py: 8, textAlign: 'center' }}>
        <Container>
          
            <Typography 
              variant="h2" 
              component="div" 
              sx={{ 
                fontWeight: 700, 
                color: 'text.primary' 
              }}
            >

              {<BlurText
              text="      Streamline Your Grading Process"
              delay={150}
              animateBy="words"
              direction="top"
              className="text-2xl mb-8"
              /> }
              
              
            </Typography>
          
          
          <Typography 
            variant="h5" 
            component="div" 
            color="text.secondary" 
            sx={{ mt: 2, minHeight: '3em' }}
          >
            <TextType 
              text={["An efficient, secure, and easy-to-use platform for teachers, students, and administrators!"]}
              typingSpeed={50} 
              pauseDuration={1500}
              showCursor={true}
              cursorCharacter="⚡"
              textColors={[theme.palette.text.secondary]}
            />
          </Typography>
                
          <Box sx={{ mt: 4 }}>
            <Button variant="contained" size="large" onClick={() => navigate('/login')}>
              Get Started
            </Button>
          </Box>

      <br/><br/><br/>
        </Container>
      </Box>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 2 }}
        viewport={{ once: true }}
      >
        <FeatureSection
          title="Data-Driven Insights"
          description="Visualize student performance with clear, intuitive graphs and analytics. Track progress over time and identify areas for improvement at a glance."
          imageSrc="/img/png/graphs.png"
          imagePosition="left"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 2, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <FeatureSection
          title="Built for Modern Educators"
          description="Designed with a developer-first approach, ensuring a secure, scalable, and reliable platform. Spend less time on administrative tasks and more time teaching."
          imageSrc="/img/png/developer.png"
          imagePosition="right"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 2, delay: 0.4 }}
        viewport={{ once: true }}
      >
        <FeatureSection
          title="Fast, Efficient, and Accessible"
          description="Launch your institution's grading system into the future. Our platform is optimized for speed and accessibility on any device, anywhere."
          imageSrc="/img/png/product-launch.png"
          imagePosition="left"
        />
        
      </motion.div>
       <Box sx={{ mb: { xs: 20, md: 30 } }}> {/* Add bottom margin to push footer down */}
        <div style={{ height: '60vh', width: '80vw', position: 'relative', margin: 'auto' }}>
          <CardSwap
            cardDistance={60}
            verticalDistance={70}
            delay={5000}
            pauseOnHover={true}
          >
          {/* Use the style prop instead of sx */}
          <Card style={cardStyle1}>
            <Typography variant="h5" sx={{ textShadow: '2px 2px 4px #000' }}>Data-Driven Insights</Typography>
            <Typography sx={{ textShadow: '1px 1px 3px #000' }}>Visualize student performance.</Typography>
          </Card>

          <Card style={cardStyle2}>
            <Typography variant="h5" sx={{ textShadow: '2px 2px 4px #000' }}>For Modern Educators</Typography>
            <Typography sx={{ textShadow: '1px 1px 3px #000' }}>Secure, scalable, and reliable.</Typography>
          </Card>

          <Card style={cardStyle3}>
            <Typography variant="h5" sx={{ textShadow: '2px 2px 4px #000' }}>Fast & Accessible</Typography>
            <Typography sx={{ textShadow: '1px 1px 3px #000' }}>Optimized for any device.</Typography>
          </Card>
        </CardSwap>
      </div>
      </Box>
      
      <Footer />
    </Box>
  );
};

export default LandingPage;
