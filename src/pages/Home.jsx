import React, { useState, useEffect, useContext } from "react";
import { AnimeContext } from "../context/AnimeContext";
import AnimeCard from "../components/AnimeCard";
import SearchBar from "../components/SearchBar";
import Filters from "../components/Filters";
import styled from "styled-components";

const HomeWrapper = styled.div`
  background: linear-gradient(45deg, #f6d02f, #ff6f91);
  padding: 20px;
  font-family: 'Comic Sans MS', cursive, sans-serif;
  color: white;
  animation: fadeIn 1.5s ease-in-out;
  
  @keyframes fadeIn {
    0% { opacity: 0; }
    100% { opacity: 1; }
  }

  h2 {
    font-size: 2.5rem;
    text-align: center;
    margin-bottom: 20px;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.6);
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
  background: rgba(0, 0, 0, 0.6);
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.6);
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.8);
  }
`;

const SearchBarWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  gap: 10px;

  input {
    padding: 10px;
    font-size: 1rem;
    border-radius: 10px;
    border: 1px solid #ffd700;
    width: 300px;
    outline: none;
    transition: background-color 0.3s ease;
    
    &:focus {
      background-color: #ff6f91;
    }
  }
`;

const FiltersWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  gap: 10px;

  select {
    padding: 10px;
    font-size: 1rem;
    border-radius: 10px;
    background-color: #ffd700;
    border: none;
    cursor: pointer;
    
    option {
      padding: 10px;
    }

    &:hover {
      background-color: #ff6f91;
    }
  }
`;

const Home = () => {
  const { addToFavorities, animeList } = useContext(AnimeContext);
  const [filteredAnime, setFilteredAnime] = useState([]);
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    setFilteredAnime(animeList);

    const uniqueGenres = [
      ...new Set(
        animeList.flatMap((anime) => anime.genres.map((genre) => genre.name))
      ),
    ];
    setGenres(uniqueGenres);
  }, [animeList]);

  const handleSearch = (query) => {
    const results = animeList.filter((anime) =>
      anime.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredAnime(results);
  };

  const handleFilter = (selectedGenres) => {
    if (selectedGenres.length === 0) {
      setFilteredAnime(animeList);
      return;
    }

    const results = animeList.filter((anime) =>
      anime.genres.some((genre) => selectedGenres.includes(genre.name))
    );
    setFilteredAnime(results);
  };

  return (
    <HomeWrapper>
      <h2>Anime List</h2>
      <SearchBarWrapper>
        <SearchBar onSearch={handleSearch} />
      </SearchBarWrapper>
      <FiltersWrapper>
        <Filters genres={genres} onFilter={handleFilter} />
      </FiltersWrapper>
      <AnimeGrid>
        {filteredAnime.map((anime) => (
          <AnimeCardWrapper key={anime.mal_id}>
            <AnimeCard
              anime={{
                id: anime.mal_id,
                title: anime.title,
                image: anime.images.jpg.image_url,
                genre: anime.genres.map((g) => g.name),
                rating: anime.score || "N/A",
              }}
              onAdd={() =>
                addToFavorities({
                  id: anime.mal_id,
                  title: anime.title,
                  image: anime.images.jpg.image_url,
                  genre: anime.genres.map((g) => g.name),
                })
              }
            />
          </AnimeCardWrapper>
        ))}
      </AnimeGrid>
    </HomeWrapper>
  );
};

export default Home;
