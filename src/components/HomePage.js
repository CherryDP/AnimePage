import React, { useState, useEffect } from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Home.css";

const Home = () => {

  const [trending, setTrending] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [popular, setPopular] = useState([]);

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
    const fetchTopRated = async () => {
      try {
        const response = await axios.get(
          "https://kitsu.io/api/edge/anime?sort=-averageRating&page"
        );
        setTopRated(response.data.data.slice(0, 5));
      } catch (error) {
        console.error("Error fetching top rated anime:", error);
      }
    };
    const fetchPopular = async () => {
      try {
        const response = await axios.get(
          "https://kitsu.io/api/edge/anime?sort=popularityRank"
        );
        setPopular(response.data.data.slice(0, 5));
      } catch (error) {
        console.error("Error fetching popular anime:", error);
      }
    };
    fetchTrending();
    fetchUpcoming();
    fetchPopular();
    fetchTopRated();
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


  return (
    <div className="container">
      
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
        <div className="col-sm-6">
          <div className="card">
            <div className="card-header">
              <h2>Top Rated</h2>
            </div>
            <Slider {...settings}>
              {topRated.map((anime) => (
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
              <h2>Popular</h2>
            </div>
            <Slider {...settings}>
              {popular.map((anime) => (
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
      
    </div>
  );
};

export default Home
