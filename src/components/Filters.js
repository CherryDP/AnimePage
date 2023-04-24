import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Filter.css";

const Filter = () => {
  const [genres, setGenres] = useState([]);
  const [mangaGenres, setMangaGenres] = useState([]);

  useEffect(() => {
    const fetchGenres = async () => {
      const response = await axios.get(
        "https://kitsu.io/api/edge/genres?page[limit]=70"
      );
      setGenres(response.data.data);

      const mangaResponse = await axios.get(
        "https://kitsu.io/api/edge/categories?media_type=manga&page[limit]=150"
      );
      setMangaGenres(mangaResponse.data.data);
    };

    fetchGenres();
  }, []);

  const generateColor = () => {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    return "#" + randomColor;
  };

  return (
    <div>
      <div className="grid-container">
        <h2>Anime Genres</h2>
        {genres.map((genre) => (
          <Link
            key={genre.attributes.slug}
            to={`/genre/${genre.attributes.slug}`}
            style={{ color: generateColor() }}
          >
            {genre.attributes.name}
          </Link>
        ))}
      </div>
      <br></br>
      <div className="grid-container">
        <h2>Manga Genres</h2>
        {mangaGenres.length > 0 &&
          mangaGenres.map((genre) => (
            <Link
              key={genre.id}
              to={`/MangaGenre/${genre.attributes.slug}`}
              style={{ color: generateColor() }}
            >
              {genre.attributes.title}
            </Link>
          ))}
      </div>
    </div>
  );
};

export default Filter;
