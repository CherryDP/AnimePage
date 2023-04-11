import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const Filter = () => {
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const history = useHistory();

  useEffect(() => {
    const fetchGenres = async () => {
      const response = await axios.get(
        "https://kitsu.io/api/edge/genres?page[limit]=20"
      );
      setGenres(response.data.data);
    };
    fetchGenres();
  }, []);

  const handleSelectChange = (event) => {
    setSelectedGenre(event.target.value);
  };

  const handleAnimeClick = (animeId) => {
    history.push(`/anime/${animeId}`);
  };

  return (
    <div>
      <select value={selectedGenre} onChange={handleSelectChange}>
        <option value="">Select a genre</option>
        {genres.map((genre) => (
          <option key={genre.id} value={genre.id}>
            {genre.attributes.name}
          </option>
        ))}
      </select>
      <ul>
        {selectedGenre &&
          genres.find((genre) => genre.id === selectedGenre).relationships.anime.data.map(
            (anime) => (
              <li key={anime.id} onClick={() => handleAnimeClick(anime.id)}>
                {anime.attributes.titles.en_jp}
              </li>
            )
          )}
      </ul>
    </div>
  );
};

export default Filter;
