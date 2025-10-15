import React, { useMemo } from "react";
import {
  Box,
  Button,
  Container,
  Typography,
  AppBar,
  Toolbar,
  alpha,
  useMediaQuery,
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
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const cardStyles = useMemo(() => {
    const baseStyle = {
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundBlendMode: "overlay",
      color: "white",
      padding: isMobile ? "12px" : "16px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-end",
      borderRadius: "16px",
      boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
    };

    return {
      style1: {
        ...baseStyle,
        background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.9)} 0%, ${alpha(theme.palette.secondary.main, 0.9)} 100%), url(/img/png/12.png)`,
      },
      style2: {
        ...baseStyle,
        background: `linear-gradient(135deg, ${alpha(theme.palette.success.main, 0.9)} 0%, ${alpha(theme.palette.info.main, 0.9)} 100%), url(/img/png/12.png)`,
      },
      style3: {
        ...baseStyle,
        background: `linear-gradient(135deg, ${alpha(theme.palette.warning.main, 0.9)} 0%, ${alpha(theme.palette.error.main, 0.9)} 100%), url(/img/png/12.png)`,
      }
    };
  }, [theme, isMobile]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundImage: `url(${
          theme.palette.mode === "dark" ? "/blackbg.jpg" : "/whitebg.jpg"
        })`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        transition: "background-image 1s ease-in-out",
      }}
    >
      {/* Header */}
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar sx={{ 
          px: { xs: 2, sm: 3, md: 4 },
          py: { xs: 1, sm: 2 }
        }}>
          <Box sx={{ flexGrow: 1 }}>
            {isMobile ? (
              <Typography 
                variant="h6" 
                sx={{ 
                  color: "text.primary",
                  fontSize: { xs: "1.1rem", sm: "1.25rem" }
                }}
              >
                🎓SGS
              </Typography>
            ) : (
              <TextPressure
                text="Student Grading System"
                flex={false}
                textColor={theme.palette.text.primary}
                minFontSize={20}
              />
            )}
          </Box>
          <Button 
            color="inherit" 
            onClick={() => navigate("/login")}
            size={isMobile ? "small" : "medium"}
            style={{marginRight : "15px" , marginBottom: "10px"}}
          >
            Login
          </Button>
        </Toolbar>
      </AppBar>

      {/* Hero Section - Perfectly Centered */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
          minHeight: { xs: "70vh", md: "80vh" },
          textAlign: "center",
          width: "100%",
          position: "relative",
        }}
      >
        <Container 
          maxWidth="lg" 
          sx={{ 
            display: "flex", 
            flexDirection: "column", 
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            position: "relative",
          }}
        > 
          {/* Main Heading - Perfectly Centered */}
          <Typography
            variant="h2"
            component="div"
            sx={{
              fontWeight: 700,
              color: "text.primary",
              lineHeight: 1.2,
              mb: { xs: 3, md: 4 },
              fontSize: { xs: "2.5rem", sm: "3rem", md: "4rem" },
            }}
          >
            <BlurText
              text="Streamline Your Grading Process"
              delay={150}
              animateBy="words"
              direction="top"
              style={{ 
                textAlign: "center",
                width: "100%",
                margin: "0 auto",
                display: "block",
              }}
            />
           </Typography>

          {/* Subtitle */}
          <Typography
            variant={isMobile ? "body1" : "h5"}
            component="div"
            color="text.secondary"
            sx={{ 
              mt: { xs: 2, md: 3 },
              mb: { xs: 3, md: 4 },
              minHeight: { xs: "4em", md: "3em" },
              lineHeight: { xs: 1.4, md: 1.6 },
              fontSize: { 
                xs: "0.9rem", 
                sm: "1.1rem", 
                md: "1.25rem" 
              },
              maxWidth: "800px",
              textAlign: "center",
              px: { xs: 2, sm: 3 },
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Box sx={{ textAlign: "center", width: "100%" }}>
              <TextType
                text={[
                  "An efficient, secure, and easy-to-use platform for teachers, students, and administrators!"
                ]}
                typingSpeed={50}
                pauseDuration={1500}
                showCursor={true}
                cursorCharacter="⚡"
                textColors={[theme.palette.text.secondary]}
              />
            </Box>
          </Typography>

          {/* CTA Button */}
          <Box sx={{ 
            mt: { xs: 2, md: 4 },
            display: "flex",
            justifyContent: "center",
            width: "100%",
            px: { xs: 2, sm: 3 },
          }}>
            <Button
              variant="contained"
              size={isMobile ? "medium" : "large"}
              onClick={() => navigate("/login")}
              sx={{
                px: { xs: 4, md: 6 },
                py: { xs: 1, md: 1.5 },
                fontSize: { xs: "0.9rem", md: "1.1rem" }
              }}
            >
              Get Started
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Feature Sections */}
      <Box sx={{ flex: 0 }}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <FeatureSection
            title="Data-Driven Insights"
            description="Visualize student performance with clear, intuitive graphs and analytics. Track progress over time and identify areas for improvement at a glance."
            imageSrc="/img/png/graphs.png"
            imagePosition={isMobile ? "top" : "left"}
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <FeatureSection
            title="Built for Modern Educators"
            description="Designed with a developer-first approach, ensuring a secure, scalable, and reliable platform. Spend less time on administrative tasks and more time teaching."
            imageSrc="/img/png/developer.png"
            imagePosition={isMobile ? "top" : "right"}
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <FeatureSection
            title="Fast, Efficient, and Accessible"
            description="Launch your institution's grading system into the future. Our platform is optimized for speed and accessibility on any device, anywhere."
            imageSrc="/img/png/product-launch.png"
            imagePosition={isMobile ? "top" : "left"}
          />
        </motion.div>
      </Box>

      {/* Card Swap Section */}
      <Box sx={{ 
        mb: { xs: 10, sm: 15, md: 20 },
        mt: { xs: 8, md: 12 }
      }}>
        <Box
          sx={{
            height: { xs: "40vh", sm: "50vh", md: "60vh" },
            width: { xs: "40vw", sm: "85vw", md: "80vw" },
            position: "relative",
            margin: "auto",
          }}
        >
          <CardSwap
            cardDistance={isMobile ? 30 : 60}
            verticalDistance={isMobile ? 40 : 70}
            delay={5000}
            pauseOnHover={!isMobile}
          >
            <Card style={cardStyles.style1}>
              <Typography 
                variant={isMobile ? "h6" : "h5"} 
                sx={{ textShadow: "2px 2px 4px #000" }}
              >
                Data-Driven Insights
              </Typography>
              <Typography 
                sx={{ textShadow: "1px 1px 3px #000" }}
              >
                Visualize student performance.
              </Typography>
            </Card>
            <Card style={cardStyles.style2}>
              <Typography 
                variant={isMobile ? "h6" : "h5"} 
                sx={{ textShadow: "2px 2px 4px #000" }}
              >
                For Modern Educators
              </Typography>
              <Typography 
                sx={{ textShadow: "1px 1px 3px #000" }}
              >
                Secure, scalable, and reliable.
              </Typography>
            </Card>
            <Card style={cardStyles.style3}>
              <Typography 
                variant={isMobile ? "h6" : "h5"} 
                sx={{ textShadow: "2px 2px 4px #000" }}
              >
                Fast & Accessible
              </Typography>
              <Typography 
                sx={{ textShadow: "1px 1px 3px #000" }}
              >
                Optimized for any device.
              </Typography>
            </Card>
          </CardSwap>
        </Box>
      </Box>

      <Footer />
    </Box>
  );
};

export default LandingPage;