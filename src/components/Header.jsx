import React from "react";
import { Link } from "react-router-dom";
import { useUser } from "../context/UserContext";
import styled from "styled-components";
import sparkleIcon from "../assets/anime_world.png"; 

const HeaderWrapper = styled.header`
  background-color: #2c2c54; 
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  animation: fadeIn 1s ease-in-out;

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

const Logo = styled.h1`
  font-size: 2.5rem;
  color: white;
  margin: 0;
  font-family: "Arial", sans-serif;
  letter-spacing: 2px;
  text-transform: uppercase;
  position: relative;
  display: inline-block;

  &:after {
    content: "";
    position: absolute;
    top: 0;
    right: -35px;
    width: 50px; 
    height: 50px;
    background-image: url(${sparkleIcon});
    background-size: contain;
    background-repeat: no-repeat;
    animation: sparkle 1.5s ease-in-out infinite;
  }

  @keyframes sparkle {
    0%, 100% {
      transform: scale(1);
      opacity: 0.5;
    }
    50% {
      transform: scale(1.2);
      opacity: 1;
    }
  }
`;

const NavLinks = styled.nav`
  display: flex;
  gap: 20px;

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

const Header = () => {
  const { user } = useUser(); 

  return (
    <HeaderWrapper>
      <Logo>AnimeWorld</Logo>
      <NavLinks>
        <Link to="/">Home</Link>
        <Link to="/favorities">Favorities</Link>
        <Link to="/about">About</Link>

        {user ? (
          <Link to="/profile">My Profile</Link>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </NavLinks>
    </HeaderWrapper>
  );
};

export default Header;
