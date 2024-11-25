import React, { createContext, useState, useEffect } from "react";

export const AnimeContext = createContext();

export const AnimeProvider = ({ children }) => {
  const [animeList, setAnimeList] = useState([]); 
  const [favorities, setFavorities] = useState([]); 
  const [animeRatings, setAnimeRatings] = useState({}); 
  const [animeComments, setAnimeComments] = useState({}); 
  const [currentUser, setCurrentUser] = useState(null); 

  const addToFavorities = (anime) => {
    if (!favorities.some((fav) => fav.id === anime.id)) {
      setFavorities((prev) => [...prev, anime]);
    }
  };

  const removeFromFavorities = (id) => {
    setFavorities((prev) => prev.filter((anime) => anime.id !== id));
  };

  const addRating = (id, rating) => {
    setAnimeRatings((prev) => ({ ...prev, [id]: rating }));
  };

  const addComment = (id, comment) => {
    setAnimeComments((prev) => ({
      ...prev,
      [id]: [...(prev[id] || []), comment],
    }));
  };

  const loginUser = (user) => {
    setCurrentUser(user); 
  };

  useEffect(() => {
    const fetchAnimeList = async () => {
      try {
        const response = await fetch("https://api.jikan.moe/v4/anime");
        const data = await response.json();
        setAnimeList(data.data); 
      } catch (error) {
        console.error("Failed to fetch anime:", error);
      }
    };

    fetchAnimeList();
  }, []);

  return (
    <AnimeContext.Provider
      value={{
        animeList,
        favorities,
        animeRatings,
        animeComments,
        currentUser,
        loginUser,
        addToFavorities,
        removeFromFavorities,
        addRating,
        addComment,
      }}
    >
      {children}
    </AnimeContext.Provider>
  );
};

