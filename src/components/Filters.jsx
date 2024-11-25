import React, { useState } from "react";
import styled from "styled-components";

const FilterWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 20px;

  button {
    background-color: #ff6f91;
    color: white;
    border: none;
    padding: 10px 15px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
      background-color: #ff4f71;
    }

    &.active {
      background-color: #ffd700;
      color: #333;
    }
  }
`;

const Filters = ({ genres, onFilter }) => {
  const [selectedGenres, setSelectedGenres] = useState([]);

  const handleGenreClick = (genre) => {
    const updatedGenres = selectedGenres.includes(genre)
      ? selectedGenres.filter((g) => g !== genre)
      : [...selectedGenres, genre];

    setSelectedGenres(updatedGenres);
    onFilter(updatedGenres);
  };

  return (
    <FilterWrapper>
      {genres.map((genre) => (
        <button
          key={genre}
          className={selectedGenres.includes(genre) ? "active" : ""}
          onClick={() => handleGenreClick(genre)}
        >
          {genre}
        </button>
      ))}
    </FilterWrapper>
  );
};

export default Filters;
