import React, { useContext, useState } from "react";
import styled from "styled-components";
import { AnimeContext } from "../context/AnimeContext";
import { Link } from "react-router-dom";

const CardWrapper = styled.div`
  border-radius: 12px;
  overflow: hidden;
  margin: 20px;
  width: 250px;
  text-align: center;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }

  img {
    width: 100%;
    height: 350px;
    object-fit: cover;
  }

  h3 {
    margin: 10px 0;
    font-size: 1.3rem;
    font-weight: bold;
    color: #333;
  }

  p {
    color: #777;
    margin: 5px 0;
    font-size: 0.9rem;
  }

  button {
    background-color: ${(props) => (props.inFavorities ? "#4caf50" : "#ff6f91")};
    color: white;
    border: none;
    padding: 12px 20px;
    width: 100%;
    border-radius: 8px;
    font-size: 1rem;
    cursor: pointer;
    margin-top: 10px;
    transition: background-color 0.3s, transform 0.2s;
    &:hover {
      background-color: ${(props) =>
        props.inFavorities ? "#45a049" : "#ff4f71"};
      transform: scale(1.05);
    }
  }
`;

const AnimeCard = ({ anime }) => {
  const {
    favorities,
    addToFavorities,
    removeFromFavorities,
  } = useContext(AnimeContext);

  const isInFavorities = favorities.some((fav) => fav.id === anime.id);

  const handleButtonClick = () => {
    if (isInFavorities) {
      removeFromFavorities(anime.id);
    } else {
      addToFavorities(anime);
    }
  };

  return (
    <CardWrapper inFavorities={isInFavorities}>
      <img src={anime.image} alt={anime.title} />
      <h3>{anime.title}</h3>
      <p>Rating: {anime.rating} ⭐</p>
      <p>{anime.genre.join(", ")}</p>
      <button onClick={handleButtonClick}>
        {isInFavorities ? "Remove from Favorities" : "Add to Favorities"}
      </button>
      <Link to={`/anime/${anime.id}`}>
        <button>See Details</button>
      </Link>
    </CardWrapper>
  );
};

export default AnimeCard;
