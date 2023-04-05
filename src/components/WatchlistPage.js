import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Watchlist = () => {
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    const savedWatchlist = localStorage.getItem("watchlist");
    if (savedWatchlist) {
      setWatchlist(JSON.parse(savedWatchlist));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
  }, [watchlist]);

  const removeFromWatchlist = (id) => {
    const updatedWatchlist = watchlist.filter((anime) => anime.mal_id !== id);
    setWatchlist(updatedWatchlist);
  };

  if (watchlist.length === 0) {
    return <div>Your watchlist is empty.</div>;
  }

  return (
    <div>
      <h1>Watchlist</h1>
      <ul>
        {watchlist.map((anime) => (
          <li key={anime.mal_id}>
            <Link to={`/anime/${anime.mal_id}`}>{anime.title}</Link>{" "}
            <button onClick={() => removeFromWatchlist(anime.mal_id)}>
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Watchlist;
