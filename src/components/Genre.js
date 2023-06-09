import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Genre.css";

const GenreAnimeList = () => {
  const { genreId } = useParams();
  const [animeList, setAnimeList] = useState([]);

  useEffect(() => {
    const fetchAnimeList = async () => {
      try {
        const response = await axios.get(
          `https://kitsu.io/api/edge/anime?filter[genres]=${genreId}&page[limit]=20`
        );
        setAnimeList(response.data.data);
        console.log(response.data.data);
        console.log(genreId)
      } catch (error) {
        console.log(error);
        console.log(error.message);
        console.log(error.stack);
        console.log(error.response.data);
        
      }
    };
    fetchAnimeList();
  }, [genreId]);
  


  return (
    <div>
      <h1>Anime List for Genre {genreId}</h1>
      {animeList.length > 0 ? (
        <ul>
          {animeList.map((anime) => (
            <li key={anime.id}>
              <Link to={`/anime/${anime.id}`} >
                <img
                  src={anime.attributes.posterImage.small}
                  alt={anime.attributes.titles.en}
                />
              </Link>
              <p>{anime.attributes.titles.en_jp}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
};

export default GenreAnimeList;