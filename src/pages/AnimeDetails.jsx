import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { AnimeContext } from "../context/AnimeContext";
import { useUser } from "../context/UserContext"; 
import styled from "styled-components";

const DetailsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 50px;
  padding: 20px;
  background: linear-gradient(45deg, #ff6f91, #ffcc99);
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
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

const AnimeImage = styled.img`
  width: 40%;
  height: 700px; 
  object-fit: cover; 
  border-radius: 12px;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
`;

const DetailsContent = styled.div`
  width: 55%;
  padding: 20px;
  color: #333;
  font-family: 'Comic Sans MS', cursive, sans-serif;

  h2 {
    font-size: 2.5rem;
    color: #ffd700;
    text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
    letter-spacing: 1px;
  }

  p {
    font-size: 1.2rem;
    line-height: 1.6;
    margin: 10px 0;
  }
`;

const Button = styled.button`
  padding: 10px 20px;
  background: #ff66b2;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;

  &:hover {
    background: #ff3399;
    transform: scale(1.05);
  }
`;

const VideoWrapper = styled.div`
  margin-top: 20px;
  text-align: center;
  padding: 20px;
  background-color: #fff3e6;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const RatingSection = styled.div`
  margin-top: 20px;
  background: #f0f8ff;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  animation: slideUp 0.5s ease-out;

  @keyframes slideUp {
    0% {
      transform: translateY(10px);
      opacity: 0;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }

  h3 {
    font-size: 1.5rem;
    color: #ff6f91;
  }

  input {
    padding: 10px;
    font-size: 1rem;
    margin-top: 10px;
    width: 100%;
    border: 2px solid #ff6f91;
    border-radius: 5px;
    outline: none;
    transition: border-color 0.3s;

    &:focus {
      border-color: #ffd700;
    }
  }
`;

const RatingDisplay = styled.div`
  margin-top: 10px;
  font-size: 16px;
  color: #333;
  font-weight: bold;
`;

const CommentSection = styled.div`
  margin-top: 20px;
  background: #ffe6f0;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  animation: slideUp 0.5s ease-out;

  h3 {
    font-size: 1.5rem;
    color: #ff6f91;
  }

  textarea {
    padding: 10px;
    font-size: 1rem;
    width: 100%;
    height: 100px;
    border: 2px solid #ff6f91;
    border-radius: 5px;
    outline: none;
    resize: none;
    transition: border-color 0.3s;

    &:focus {
      border-color: #ffd700;
    }
  }
`;

const CommentList = styled.div`
  margin-top: 10px;
`;

const CommentItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
  background: #ffffff;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #ff66b2;
`;

const CommentText = styled.div`
  display: flex;
  flex-direction: column;
`;

const GuestName = styled.span`
  font-weight: bold;
  color: #ff66b2;
`;

const EpisodeListWrapper = styled.div`
  margin-top: 30px;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Episode = styled.div`
  padding: 10px;
  margin-bottom: 10px;
  background-color: #f8f8f8;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Comment = styled.div`
  font-style: italic;
  color: #333;
  background: #ffffff;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const AnimeDetails = () => {
  const { id } = useParams();
  const { animeList, animeRatings, animeComments, addRating, addComment } = useContext(AnimeContext);
  const { user } = useUser(); 

  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");
  const [submittedRating, setSubmittedRating] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);
  const [episodes, setEpisodes] = useState([]);

  const anime = animeList.find((anime) => anime.mal_id.toString() === id);

  useEffect(() => {
    if (!anime) return;

    const fetchAnimeDetails = async () => {
      try {
        const response = await fetch(`https://api.jikan.moe/v4/anime/${id}`);
        const data = await response.json();

        const trailer = data.data.trailer;
        if (trailer && trailer.url) {
          const youtubeEmbedUrl = trailer.url.replace("https://www.youtube.com/watch?v=", "https://www.youtube.com/embed/");
          setVideoUrl(youtubeEmbedUrl);
        }

        const episodeList = data.data.episodes || [];
        setEpisodes(episodeList);
      } catch (error) {
        console.error("Error fetching anime details:", error);
      }
    };

    fetchAnimeDetails();
  }, [anime, id]);

  if (!animeList.length) {
    return (
      <div>
        <h2>Loading...</h2>
        <p>Fetching anime list from the API...</p>
      </div>
    );
  }

  if (!anime) {
    return (
      <div>
        <h2>Anime not found</h2>
        <p>The requested anime could not be found in the list.</p>
      </div>
    );
  }

  const handleRatingChange = (e) => {
    setRating(e.target.value);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmitRating = () => {
    if (rating) {
      addRating(anime.mal_id, rating);
      setSubmittedRating(rating);
      setRating("");
    }
  };

  const handleSubmitComment = () => {
    if (comment) {
      const authorName = user && user.username ? user.username : "Guest"; 
      const commentWithAuthor = { text: comment, author: authorName, avatar: user ? user.avatar : null }; 
  
      addComment(anime.mal_id, commentWithAuthor); 
      setComment("");
    }
  };

  return (
    <DetailsWrapper>
      <AnimeImage src={anime.images.jpg.image_url} alt={anime.title} />
      <DetailsContent>
        <h2>{anime.title}</h2>
        <p>Genre: {anime.genres.map((genre) => genre.name).join(", ")}</p>
        <p>Synopsis: {anime.synopsis}</p>
        <p>Status: {anime.status}</p>

        {videoUrl && (
          <VideoWrapper>
            <h3>Watch Trailer:</h3>
            <iframe
              width="560"
              height="315"
              src={videoUrl}
              title="Anime Trailer"
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </VideoWrapper>
        )}

        {episodes.length > 0 && (
          <EpisodeListWrapper>
            <h3>Episodes:</h3>
            {episodes.map((episode, index) => (
              <Episode key={index}>
                <p>{episode.title}</p>
                <Button onClick={() => window.open(`https://www.crunchyroll.com/${anime.title.toLowerCase().replace(/\s+/g, "-")}/episode-${episode.episode_id}`, "_blank")}>
                  Watch Episode {episode.episode_id}
                </Button>
              </Episode>
            ))}
          </EpisodeListWrapper>
        )}

        <RatingSection>
          <h3>Rate this Anime:</h3>
          <input
            type="number"
            min="1"
            max="10"
            value={rating}
            onChange={handleRatingChange}
            placeholder="Rate from 1 to 10"
          />
          <Button onClick={handleSubmitRating}>Submit Rating</Button>
          {submittedRating && (
            <RatingDisplay>
              Your rating for this anime: {submittedRating}
            </RatingDisplay>
          )}
        </RatingSection>

        <CommentSection>
          <h3>Leave a Comment:</h3>
          <textarea
            value={comment}
            onChange={handleCommentChange}
            placeholder="Write your comment here"
          />
          <Button onClick={handleSubmitComment}>Submit Comment</Button>

          <CommentList>
            <h4>Comments:</h4>
            {animeComments[anime.mal_id] && animeComments[anime.mal_id].map((comment, index) => (
              <CommentItem key={index}>
                {comment.avatar && <Avatar src={comment.avatar} alt="Avatar" />}
                <CommentText>
                  <GuestName>{comment.author}:</GuestName> {comment.text}
                </CommentText>
              </CommentItem>
            ))}
          </CommentList>
        </CommentSection>
      </DetailsContent>
    </DetailsWrapper>
  );
};

export default AnimeDetails;
