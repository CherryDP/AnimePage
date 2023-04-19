import React, { useState, useEffect } from "react";
import "./Header.css";
import { FaHome, FaTimes,FaReadme } from "react-icons/fa";
import { Link, useHistory, useLocation } from "react-router-dom";
import axios from "axios";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const location = useLocation();
  const CancelToken = axios.CancelToken;
  const source = CancelToken.source();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `https://kitsu.io/api/edge/anime?filter[text]=${encodeURI(
          searchQuery
        )}&page[limit]=10`,
        { cancelToken: source.token }
      );
      setSearchResults(response.data.data);
      setIsLoading(false);
      history.push(`/search-results?q=${searchQuery}`);
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log("Request cancelled");
      } else {
        console.error("Error searching for anime:", error);
      }
    }
  };

  

  useEffect(() => {
    if (searchQuery.length > 0) {
      handleSearch({ preventDefault: () => {} });
    } else {
      setSearchResults([]);
      setIsLoading(false);
    }
  }, [searchQuery]);

  return (
    <header>
      <nav>
        <button className="menu-btn" onClick={toggleMenu}>
          <span className={isMenuOpen ? "open" : ""}></span>
          <span className={isMenuOpen ? "open" : ""}></span>
          <span className={isMenuOpen ? "open" : ""}></span>
        </button>
        <ul className={`menu ${isMenuOpen ? "open" : ""}`}>
          <li>
            <Link to="/" onClick={handleLinkClick}>
              <FaHome /> Home
            </Link>
          </li>
          <li>
            <Link to="/Filters" onClick={handleLinkClick}>
              <FaTimes/>Filters
            </Link>
          </li>
          <li>
            <Link to="/HomePageManga" onClick={handleLinkClick}>
              <FaReadme /> Manga
            </Link>
          </li>
        </ul>
      </nav>
      <div className="search-container">
        <form onSubmit={handleSearch} className="position-relative">
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
          {searchResults.length > 0 && location.pathname === "/search-results" && (
            <div className="search-results position-absolute w-100 bg-white">
              <h2>Search Results</h2>
              <ul className="list-group list-group-flush">
                {searchResults.map((anime) => (
                  <li key={anime.id} className="list-group-item">
                    <Link to={`/anime/${anime.id}`} onClick={handleLinkClick}>
                      <div className="d-flex align-items-center">
                        <img src={anime.attributes.posterImage.small} alt={anime.attributes.canonicalTitle} width="50" height="70" />
                        <div className="ml-2">
                          <div className="font-weight-bold">
                            {anime.attributes.canonicalTitle.length > 20
                              ? `${anime.attributes.canonicalTitle.slice(0, 20)}...`
                              : anime.attributes.canonicalTitle}
                          </div>
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </form>
      </div>
    </header>
  );
  
};

export default Header;
