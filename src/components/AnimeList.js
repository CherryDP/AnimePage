import React from "react";

const AnimeList = ({ animeData }) => {
  return (
    <div>
      {animeData.map((anime) => (
        <div key={anime.id}>
          <h3>{anime.attributes.canonicalTitle}</h3>
          <img src={anime.attributes.posterImage.medium} alt={anime.attributes.canonicalTitle} />
        </div>
      ))}
    </div>
  );
};

export default AnimeList;
