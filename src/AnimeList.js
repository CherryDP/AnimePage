import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AnimeRecommendations = () => {
  const [animeList, setAnimeList] = useState([]);

  useEffect(() => {
    axios.get('https://kitsu.io/api/edge/anime?sort=-average_rating')
      .then(response => {
        setAnimeList(response.data.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-5">Anime Recommendations</h1>
      <div className="row">
        {animeList.map(anime => (
          <div className="col-md-4" key={anime.id}>
            <div className="card mb-4">
              <img src={anime.attributes.posterImage.small} className="card-img-top" alt={anime.attributes.titles.en} />
              <div className="card-body">
                <h5 className="card-title">{anime.attributes.titles.en}</h5>
                <p className="card-text">{anime.attributes.synopsis}</p>
                <a href={anime.links.self} target="_blank" rel="noreferrer" className="btn btn-primary">More Info</a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnimeRecommendations;
