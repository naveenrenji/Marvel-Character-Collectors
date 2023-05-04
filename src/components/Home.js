import React from "react";
import { Card, Typography } from "@mui/material";
import { styled } from "@mui/system";

const StyledContainer = styled('div')({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  height: "80vh",
  backgroundColor: "#202020"
})

const StyledTitle = styled('h1')({
  fontFamily: "Marvel, sans-serif",
  fontWeight: 800,
  fontSize: "3rem",
  color: "white",
  marginBottom: "2rem",
  textAlign: "center"
})

const StyledCard = styled(Card)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "80%",
  padding: "2rem",
  borderRadius: "10px",
  boxShadow: "0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22)",
  backgroundColor: "#383838",
  color: "white"
})

const StyledSubTitle = styled('h2')({
  fontFamily: "Marvel, sans-serif",
  fontWeight: 600,
  fontSize: "1.5rem",
  color: "#ec0d19",
  marginBottom: "2rem",
  textAlign: "center"
})

const StyledText = styled('p')({
  fontFamily: "Roboto, sans-serif",
  fontWeight: 400,
  fontSize: "1rem",
  color: "white",
  textAlign: "center"
})

const Home = () => {
  return (
    <StyledContainer>
      <StyledTitle>Welcome to the Marvel App</StyledTitle>
      <StyledCard variant="outlined">
        <StyledSubTitle>Discover your favorite Marvel superheroes with us</StyledSubTitle>
        <Typography variant="body1" align="center" gutterBottom>
          This app uses the Marvel API to help you find the latest superheroes and their detailed information, powers, and stories.
        </Typography>
        <Typography variant="body1" align="center" gutterBottom>
          With just a few clicks, you can dive deep into the Marvel universe and learn about your favorite heroes and villains.
        </Typography>
        <StyledSubTitle>Favorite Marvel memory</StyledSubTitle>
        <StyledCard variant="outlined">
          <StyledText>
            My favorite Marvel memory was when I watched the first Avengers movie in the theater. It was a surreal experience to see all my favorite superheroes come together and fight against a common enemy. The audience was cheering and clapping during the entire movie, and I was amazed by the epic action sequences and the witty humor. It was a defining moment for the Marvel Cinematic Universe and a memory that I will cherish forever.
          </StyledText>
        </StyledCard>
      </StyledCard>
    </StyledContainer>
  );
};

export default Home;
