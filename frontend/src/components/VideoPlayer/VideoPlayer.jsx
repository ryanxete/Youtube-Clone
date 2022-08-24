import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./VideoPlayer.css";

const VideoPlayer = (props) => {
  const { videoId } = useParams();
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    getSingleVideo();
  }, []);

  async function getSingleVideo() {
    let response = await axios.get(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=AIzaSyDmAd6-cTFWb0pjvlO3noSa-1AwgNEGHIc
      `
    );
    setVideos(response.data.items);
  }

  return (
    <div className="video">
      <iframe
        className="iframe"
        id="ytplayer"
        type="text/html"
        width="1240"
        height="720"
        src={`https://www.youtube.com/embed/${videoId}`}
        frameBorder="0"
      ></iframe>
      {videos.map(function (video, index) {
        return (
          <div key={index} className="snippet">
            <p className="title">{video.snippet.title}</p>
            <p className="discription">{video.snippet.description}</p>
          </div>
        );
      })}
    </div>
  );
};

export default VideoPlayer;
