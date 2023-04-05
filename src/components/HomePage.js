import React, { useState, useEffect } from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Home.css";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [trending, setTrending] = useState([]);
  const [upcoming, setUpcoming] = useState([]);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const response = await axios.get(
          "https://kitsu.io/api/edge/trending/anime"
        );
        setTrending(response.data.data.slice(0, 5));
      } catch (error) {
        console.error("Error fetching trending anime:", error);
      }
    };
    const fetchUpcoming = async () => {
      try {
        const response = await axios.get(
          "https://kitsu.io/api/edge/anime?filter[status]=upcoming&sort=popularityRank"
        );
        setUpcoming(response.data.data.slice(0, 5));
      } catch (error) {
        console.error("Error fetching upcoming anime:", error);
      }
    };
    fetchTrending();
    fetchUpcoming();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `https://kitsu.io/api/edge/anime?filter[text]=${searchQuery}&page[limit]=10`
      );
      setSearchResults(response.data.data);
    } catch (error) {
      console.error("Error searching for anime:", error);
    }
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
            <Slider {...settings}>
              {trending.map((anime) => (
                <div key={anime.id}>
                  <a href={`/anime/${anime.id}`}>
                    <img
                      src={anime.attributes.posterImage.small}
                      alt={anime.attributes.canonicalTitle}
                    />
                  </a>
                  <p>{anime.attributes.canonicalTitle}</p>
                </div>
              ))}
            </Slider>
          </div>
        </div>
        <div className="col-sm-6">
          <div className="card">
            <div className="card-header">
              <h2>Upcoming</h2>
            </div>
            <Slider {...settings}>
              {upcoming.map((anime) => (
                <div key={anime.id}>
                  <a href={`/anime/${anime.id}`}>
                    <img
                      src={anime.attributes.posterImage.small}
                      alt={anime.attributes.canonicalTitle}
                    />
                  </a>
                  <p>{anime.attributes.canonicalTitle}</p>
                </div>
              ))}
            </Slider>
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
                    <a href={`/anime/${anime.id}`}>
                      {anime.attributes.canonicalTitle}
                    </a>
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
