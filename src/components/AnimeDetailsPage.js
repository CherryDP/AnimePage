import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const AnimeDetails = () => {
  const { id } = useParams();
  const [anime, setAnime] = useState(null);

  useEffect(() => {
    const fetchAnime = async () => {
      const response = await axios.get(
        `https://kitsu.io/api/edge/anime/${id}`
      );
      setAnime(response.data.data);
    };
    fetchAnime();
  }, [id]);

  if (!anime) {
    return <div>Loading...</div>;
  }

  return (
    <div>
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
    </div>
  );
};

export default AnimeDetails;
