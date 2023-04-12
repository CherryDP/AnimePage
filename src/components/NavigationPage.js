import React, { useState } from "react";
import "./Header.css";
import { FaHome, FaTimes } from "react-icons/fa";
import { Link, useHistory, useLocation } from "react-router-dom";
import axios from "axios";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const history = useHistory();
  const location = useLocation();

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
        `https://kitsu.io/api/edge/anime?filter[text]=${encodeURI(searchQuery)}&page[limit]=10`
      );
      setSearchResults(response.data.data);
      setSearchQuery("");
      history.push(`/search-results?q=${searchQuery}`); // przekierowanie do strony wyników wyszukiwania
    } catch (error) {
      console.error("Error searching for anime:", error);
    }
  };

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
              Filters
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
              {anime.attributes.canonicalTitle}
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
