import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Home.css";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [trending, setTrending] = useState([]);
  const [upcoming, setUpcoming] = useState([]);

  useEffect(() => {
    const fetchTrending = async () => {
      const response = await axios.get(
        "https://kitsu.io/api/edge/trending/anime"
      );
      setTrending(response.data.data.slice(0, 5));
    };
    const fetchUpcoming = async () => {
      const response = await axios.get(
        "https://kitsu.io/api/edge/anime?filter[status]=upcoming&sort=popularityRank"
      );
      setUpcoming(response.data.data.slice(0, 5));
    };
    fetchTrending();
    fetchUpcoming();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    const response = await axios.get(
      `https://kitsu.io/api/edge/anime?filter[text]=${searchQuery}&page[limit]=10`
    );
    setSearchResults(response.data.data);
  };

  return (
    <div className="container">
      <form onSubmit={handleSearch}>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for anime"
          />
          <button type="submit" className="btn btn-outline-secondary">
            Search
          </button>
        </div>
      </form>
      <div className="row">
        <div className="col-sm-6">
          <div className="card">
            <div className="card-header">
              <h2>Trending</h2>
            </div>
            <ul className="list-group list-group-flush">
              {trending.map((anime) => (
                <li key={anime.id} className="list-group-item">
                  <a href={`/anime/${anime.id}`}>{anime.attributes.canonicalTitle}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="col-sm-6">
          <div className="card">
            <div className="card-header">
              <h2>Upcoming</h2>
            </div>
            <ul className="list-group list-group-flush">
              {upcoming.map((anime) => (
                <li key={anime.id} className="list-group-item">
                  <a href={`/anime/${anime.id}`}>{anime.attributes.canonicalTitle}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      {searchResults.length > 0 && (
        <div className="row">
          <div className="col-sm-12">
            <div className="card">
              <div className="card-header">
                <h2>Search Results</h2>
              </div>
              <ul className="list-group list-group-flush">
                {searchResults.map((anime) => (
                  <li key={anime.id} className="list-group-item">
                    <a href={`/anime/${anime.id}`}>{anime.attributes.canonicalTitle}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home
