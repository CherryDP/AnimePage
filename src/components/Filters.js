import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Filter.css";

const Filter = () => {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const fetchGenres = async () => {
      const response = await axios.get(
        "https://kitsu.io/api/edge/genres?page[limit]=20"
      );
      setGenres(response.data.data);
    };
    fetchGenres();
  }, []);

  const generateColor = () => {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    return "#" + randomColor;
  };

  return (
    <div className="grid-container">
      {genres.map((genre) => (
        <Link
          key={genre.id}
          to={`/genre/${genre.id}`}
          style={{ color: generateColor() }}
        >
          {genre.attributes.name}
        </Link>
      ))}
    </div>
  );
};

export default Filter;