import React, { useContext } from "react";
import { AnimeContext } from "../context/AnimeContext";
import AnimeCard from "../components/AnimeCard";
import styled from "styled-components";

const FavoritiesWrapper = styled.div`
  padding: 20px;
  background: linear-gradient(45deg, #ff6f91, #f6d02f);
  font-family: 'Comic Sans MS', cursive, sans-serif;
  color: white;
  text-align: center;
  animation: fadeIn 1.5s ease-in-out;

  @keyframes fadeIn {
    0% { opacity: 0; }
    100% { opacity: 1; }
  }

  h2 {
    font-size: 2.5rem;
    margin-bottom: 30px;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.6);
    letter-spacing: 2px;
  }

  p {
    font-size: 1.5rem;
    color: #ffd700;
    margin-top: 20px;
    font-style: italic;
  }
`;

const AnimeGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  animation: slideUp 1s ease-in-out;

  @keyframes slideUp {
    0% {
      transform: translateY(100px);
      opacity: 0;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;

const AnimeCardWrapper = styled.div`
  background: rgba(0, 0, 0, 0.7);
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.6);
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.8);
  }
`;

const Favorities = () => {
  const { favorities, removeFromFavorities } = useContext(AnimeContext);

  return (
    <FavoritiesWrapper>
      <h2>My Favorites</h2>
      {favorities.length === 0 ? (
        <p>No favorites added yet.</p>
      ) : (
        <AnimeGrid>
          {favorities.map((anime) => (
            <AnimeCardWrapper key={anime.id}>
              <AnimeCard
                anime={anime}
                onAdd={() => removeFromFavorities(anime.id)}
              />
            </AnimeCardWrapper>
          ))}
        </AnimeGrid>
      )}
    </FavoritiesWrapper>
  );
};

export default Favorities;
