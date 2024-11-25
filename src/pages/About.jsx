import React from "react";
import styled from "styled-components";

const AboutWrapper = styled.div`
  padding: 40px;
  background: linear-gradient(45deg, #f8cdda, #1e3c72);
  color: white;
  text-align: center;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  animation: fadeIn 1s ease-in-out;

  @keyframes fadeIn {
    0% { opacity: 0; }
    100% { opacity: 1; }
  }
`;

const Title = styled.h2`
  font-size: 3rem;
  margin-bottom: 20px;
  color: #ffd700;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
  animation: slideIn 1s ease-out;

  @keyframes slideIn {
    0% { transform: translateY(-20px); opacity: 0; }
    100% { transform: translateY(0); opacity: 1; }
  }
`;

const Paragraph = styled.p`
  font-size: 1.3rem;
  line-height: 1.8;
  max-width: 800px;
  margin: 0 auto;
  padding: 0 10px;
  animation: fadeIn 1s ease-out;

  @keyframes fadeIn {
    0% { opacity: 0; }
    100% { opacity: 1; }
  }
`;

const FeaturesWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 40px;
  gap: 30px;
  flex-wrap: wrap;
`;

const FeatureCard = styled.div`
  background: #ffe6f0;
  padding: 20px;
  border-radius: 10px;
  width: 250px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease-in-out;
  text-align: center;
  color: #333;

  &:hover {
    transform: translateY(-10px);
  }

  h3 {
    font-size: 1.5rem;
    color: #ff66b2;
    margin-bottom: 10px;
  }

  p {
    font-size: 1.1rem;
    color: #555;
  }
`;

const About = () => (
  <AboutWrapper>
    <Title>About AnimeWorld</Title>
    <Paragraph>
      Welcome to AnimeWorld, your go-to platform for discovering and rating anime! 
      Dive into a world filled with thousands of anime titles, explore genres, and share your 
      thoughts about your favorite shows. Whether you're a newcomer or a seasoned anime fan, 
      AnimeWorld has something for everyone.
    </Paragraph>

    <h3 style={{ marginTop: "40px", fontSize: "2.2rem", color: "#ffd700" }}>Our Features</h3>
    <FeaturesWrapper>
      <FeatureCard>
        <h3>Extensive Collection</h3>
        <p>Browse through an ever-growing list of anime titles and discover your next favorite show.</p>
      </FeatureCard>

      <FeatureCard>
        <h3>Rate & Review</h3>
        <p>Share your opinion with the community! Rate and review your favorite anime series.</p>
      </FeatureCard>

      <FeatureCard>
        <h3>Favorites List</h3>
        <p>Create your personal list of favorite anime for easy access and recommendations.</p>
      </FeatureCard>
    </FeaturesWrapper>

    <Paragraph style={{ marginTop: "40px" }}>
      AnimeWorld is not just a platform, it's a community. Join us, interact with fellow fans, 
      and share your anime journey. Whether you're into shonen, shojo, or slice-of-life genres, 
      you'll find a place here at AnimeWorld. Happy watching!
    </Paragraph>
  </AboutWrapper>
);

export default About;
