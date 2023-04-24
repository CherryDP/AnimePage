import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Genre.css";

const GenreMangaList = () => {
  const { genreId } = useParams();
  const [mangaList, setMangaList] = useState([]);

  useEffect(() => {
    const fetchMangaList = async () => {
      try {
        const response = await axios.get(
          `https://kitsu.io/api/edge/manga?filter[categories]=${genreId}&page[limit]=20`
        );
        setMangaList(response.data.data);
        console.log(response.data.data);
        console.log(genreId);
      } catch (error) {
        console.log(error);
        console.log(error.message);
        console.log(error.stack);
        console.log(error.response.data);
      }
    };
    fetchMangaList();
  }, [genreId]);
  


  return (
    <div>
      <h1>Manga List for Category {genreId}</h1>
      {mangaList.length > 0 ? (
        <ul>
          {mangaList.map((manga) => (
            <li key={manga.id}>
              <Link to={`/manga/${manga.id}`} >
                <img
                  src={manga.attributes.posterImage.small}
                  alt={manga.attributes.titles.en}
                />
              </Link>
              <p>{manga.attributes.titles.en_jp}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
};

export default GenreMangaList;
