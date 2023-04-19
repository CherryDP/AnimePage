import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./AnimeDetail.css";

const AnimeDetails = () => {
  const { id } = useParams();
  const [anime, setAnime] = useState(null);
  const [trailer, setTrailer] = useState(null);

  useEffect(() => {
    const fetchAnime = async () => {
      const response = await axios.get(
        `https://kitsu.io/api/edge/anime/${id}`
      );
      setAnime(response.data.data);
      setTrailer(response.data.data.attributes.youtubeVideoId);
    };
    fetchAnime();
  }, [id]);

  if (!anime) {
    return <div>Loading...</div>;
  }

  return (
    <div className="anime-details">
      <h1>{anime.attributes.titles.en_jp}</h1>
      <img src={anime.attributes.posterImage.original} alt={anime.attributes.titles.en_jp} />
      <div>
        <strong>Type:</strong> {anime.attributes.showType}
      </div>
      <div>
        <strong>Episodes:</strong> {anime.attributes.episodeCount}
      </div>
      <div>
        <strong>Score:</strong> {anime.attributes.averageRating}
      </div>
      <div>
        <strong>Status:</strong> {anime.attributes.status}
      </div>
      <div>
        <strong>Synopsis:</strong> {anime.attributes.synopsis}
      </div>
      {trailer && (
        <div>
          <iframe
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${trailer}`}
            title="Trailer"
            allowFullScreen
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default AnimeDetails;
