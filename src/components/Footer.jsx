import React from "react";
import styled from "styled-components";

const FooterWrapper = styled.footer`
  background-color: #2c2c54; 
  color: white;
  text-align: center;
  padding: 20px;
  box-shadow: 0 -4px 10px rgba(0, 0, 0, 0.2);
`;

const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 10px;

  a {
    text-decoration: none;
    color: white;
    font-size: 1.2rem;
    font-family: "Comic Sans MS", cursive, sans-serif;
    font-weight: bold;
    position: relative;
    transition: color 0.3s;

    &:hover {
      color: #ffd700;
      text-shadow: 0 0 15px rgba(255, 215, 0, 0.6);
    }

    &:after {
      content: "";
      position: absolute;
      width: 0;
      height: 2px;
      background: #ffd700;
      bottom: -5px;
      left: 0;
      transition: width 0.3s;
    }

    &:hover:after {
      width: 100%;
    }
  }
`;

const Footer = () => (
  <FooterWrapper>
    <p>&copy; 2024 AnimeWorld. All rights reserved.</p>
    <SocialLinks>
      <a href="https://www.facebook.com/profile.php?id=100021571760430&locale=uk_UA" target="_blank" rel="noopener noreferrer">
        Facebook
      </a>
      <a href="https://www.instagram.com/viktor_pohribnyi/" target="_blank" rel="noopener noreferrer">
        Instagram
      </a>
      <a href="https://t.me/viktor_pohribnyi" target="_blank" rel="noopener noreferrer">
        Telegram
      </a>
    </SocialLinks>
  </FooterWrapper>
);

export default Footer;
