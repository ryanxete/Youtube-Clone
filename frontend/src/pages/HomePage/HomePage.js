import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import SearchBar from "../../components/SearchBar/SearchBar";
import { Link } from "react-router-dom";
import "./HomePage.css";

const HomePage = () => {
  // The "user" value from this Hook contains the decoded logged in user information (username, first name, id)
  // The "token" value is the JWT token that you will send in the header of any request requiring authentication
  //TODO: Add an AddCars Page to add a car for a logged in user's garage
  const [user, token] = useAuth();
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    async function getVideos() {
      let response = await axios.get(
        `https://www.googleapis.com/youtube/v3/search?q=aerospace&key=AIzaSyDmAd6-cTFWb0pjvlO3noSa-1AwgNEGHIc
        &part=snippet&maxResults=9`
      );
      setVideos(response.data.items);
    }
    getVideos();
  }, [token]);

  return (
    <div>
      <h3>
        <p className="welcome">
          Welcome <span>{user.username}!</span>
        </p>
      </h3>

      <SearchBar setVideos={setVideos} />
      <div className="vid-container">
        {videos.map(function (vid, index) {
          {
            if (vid.snippet && vid.id.videoId) {
              return (
                <div className="singlevid" key={index}>
                  <Link to={`/video=${vid.id.videoId}`}>
                    <div className="vidtitle">{vid.snippet.title}</div>
                    <img src={vid.snippet.thumbnails.high.url}></img>
                  </Link>
                </div>
              );
            }
          }
        })}
      </div>
    </div>
  );
};

export default HomePage;
