import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./MangaDetails.css";

const MangaDetails = () => {
  const { id } = useParams();
  const [manga, setManga] = useState(null);

  useEffect(() => {
    const fetchManga = async () => {
      const response = await axios.get(
        `https://kitsu.io/api/edge/manga/${id}`
      );
      setManga(response.data.data);
    };
    fetchManga();
  }, [id]);

  if (!manga) {
    return <div>Loading...</div>;
  }

  return (
    <div className="manga-details">
      <h1>{manga.attributes.titles?.en_jp}</h1>
      <img
        src={manga.attributes.posterImage?.large}
        alt={manga.attributes.titles?.en_jp}
      />

      {manga.attributes.type && (
        <div>
          <strong>Type:</strong> {manga.attributes.type}
        </div>
      )}
      {manga.attributes.volumeCount && (
        <div>
          <strong>Volumes:</strong> {manga.attributes.volumeCount}
        </div>
      )}
      {manga.attributes.chapterCount && (
        <div>
          <strong>Chapters:</strong> {manga.attributes.chapterCount}
        </div>
      )}
      {manga.attributes.averageRating && (
        <div>
          <strong>Score:</strong> {manga.attributes.averageRating}
        </div>
      )}
      <div>
        <strong>Status:</strong> {manga.attributes.status}
      </div>
      <div>
        <strong>Synopsis:</strong> {manga.attributes.synopsis}
      </div>
    </div>
  );
};

export default MangaDetails;
