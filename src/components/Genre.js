import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const GenreAnimeList = () => {
  const { genreId } = useParams();
  const [animeList, setAnimeList] = useState([]);

  useEffect(() => {
    const fetchAnimeList = async () => {
      const response = await axios.get(
        `https://kitsu.io/api/edge/anime?filter[genres]=${genreId}&page[limit]=20`
      );
      setAnimeList(response.data.data);
    };
    fetchAnimeList();
  }, [genreId]);

  return (
    <div>
      <h1>Anime List for Genre {genreId}</h1>
      <ul>
        {animeList.map((anime) => (
          <li key={anime.id}>
            <img
              src={anime.attributes.posterImage.small}
              alt={anime.attributes.titles.en}
            />
            <div>{anime.attributes.titles.en}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GenreAnimeList;
