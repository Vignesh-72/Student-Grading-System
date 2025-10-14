import React from "react";
import {
  Box,
  Button,
  Container,
  Typography,
  AppBar,
  Toolbar,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import FeatureSection from "../components/FeatureSection";
import Footer from "../components/Footer";
import TextType from "../components/TextType";
import TextPressure from "../components/TextPressure";
import BlurText from "../components/BlurText";
import { motion } from "framer-motion";
import CardSwap, { Card } from "../components/CardSwap";

const LandingPage = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  const cardStyle1 = {
    backgroundImage: "url(/img/png/waving.png)",
    backgroundSize: "cover",
    backgroundPosition: "center",
    color: "white",
    padding: "16px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
  };

  const cardStyle2 = {
    ...cardStyle1,
    backgroundImage: "url(/img/png/developer.png)",
  };

  const cardStyle3 = {
    ...cardStyle1,
    backgroundImage: "url(/img/png/12.png)",
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        backgroundImage: `url(${
          theme.palette.mode === "dark" ? "/blackbg.jpg" : "/whitebg.jpg"
        })`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        transition: "background-image 1s ease-in-out", // Smooth transition for the background
      }}
    >
      {/* Header */}
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar sx={{ pr: 8 }}>
          <Box sx={{ flexGrow: 1 } }>
            <TextPressure
              text="Student Grading System"
              flex={false}
              textColor={theme.palette.text.primary}
              minFontSize={20}
            />
          </Box>
          <Button
            color="inherit"
            onClick={() => navigate("/login")}
            style={{ marginRight: "30px" }}
          >
            Login
          </Button>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "80vh",
          textAlign: "center",
        }}
      >
        <Container>
          <Box
            className="MuiTypography-root MuiTypography-h2"
            sx={{
              fontWeight: 700,
              color: "text.primary",
              lineHeight: 0.2,
              mb: 2,
              fontSize: { xs: "2.5rem", md: "3.75rem" },
            }}
          >
            <BlurText
              text="       Streamline Your Grading Process"
              delay={150}
              animateBy="words"
              direction="top"
            />
          </Box>
          <Typography
            variant="h5"
            component="div"
            color="text.secondary"
            sx={{ mt: 2, minHeight: "3em" }}
          >
            <TextType
              text={[
                "An efficient, secure, and easy-to-use platform for teachers, students, and administrators!",
              ]}
              typingSpeed={50}
              pauseDuration={1500}
              showCursor={true}
              cursorCharacter="⚡"
              textColors={[theme.palette.text.secondary]}
            />
          </Typography>
          <Box sx={{ mt: 4 }}>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate("/login")}
            >
              Get Started
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Feature Sections */}
      <motion.div /* ... */>
        <FeatureSection
          title="Data-Driven Insights"
          description="Visualize student performance with clear, intuitive graphs and analytics. Track progress over time and identify areas for improvement at a glance."
          imageSrc="/img/png/graphs.png"
          imagePosition="left"
        />
      </motion.div>
      <motion.div /* ... */>
        <FeatureSection
          title="Built for Modern Educators"
          description="Designed with a developer-first approach, ensuring a secure, scalable, and reliable platform. Spend less time on administrative tasks and more time teaching."
          imageSrc="/img/png/developer.png"
          imagePosition="right"
        />
      </motion.div>
      <motion.div /* ... */>
        <FeatureSection
          title="Fast, Efficient, and Accessible"
          description="Launch your institution's grading system into the future. Our platform is optimized for speed and accessibility on any device, anywhere."
          imageSrc="/img/png/product-launch.png"
          imagePosition="left"
        />
      </motion.div>

      {/* Card Swap Section */}
      <Box sx={{ mb: { xs: 20, md: 30 } }}>
        <div
          style={{
            height: "60vh",
            width: "80vw",
            position: "relative",
            margin: "auto",
          }}
        >
          <CardSwap
            cardDistance={60}
            verticalDistance={70}
            delay={5000}
            pauseOnHover={true}
          >
            <Card style={cardStyle1}>
              <Typography variant="h5" sx={{ textShadow: "2px 2px 4px #000" }}>
                Data-Driven Insights
              </Typography>
              <Typography sx={{ textShadow: "1px 1px 3px #000" }}>
                Visualize student performance.
              </Typography>
            </Card>
            <Card style={cardStyle2}>
              <Typography variant="h5" sx={{ textShadow: "2px 2px 4px #000" }}>
                For Modern Educators
              </Typography>
              <Typography sx={{ textShadow: "1px 1px 3px #000" }}>
                Secure, scalable, and reliable.
              </Typography>
            </Card>
            <Card style={cardStyle3}>
              <Typography variant="h5" sx={{ textShadow: "2px 2px 4px #000" }}>
                Fast & Accessible
              </Typography>
              <Typography sx={{ textShadow: "1px 1px 3px #000" }}>
                Optimized for any device.
              </Typography>
            </Card>
          </CardSwap>
        </div>
      </Box>

      <Footer />
    </Box>
  );
};

export default LandingPage;
