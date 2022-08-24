import React, { useEffect } from "react";
import RelatedVideos from "../../components/RelatedVideos/RelatedVideos";
import VideoPlayer from "../../components/VideoPlayer/VideoPlayer";
import Comment from "../../components/Comment/Comment";
import useAuth from "../../hooks/useAuth";
import "./VideoPage.css";
import { useState } from "react";

const VideoPage = (props) => {
  const [user, token] = useAuth();
  const [comments, setComments] = useState([]);
  const [videoId, setVideoId] = useState(0);

  return (
    <div className="videopage">
      <div className="videoplayer-container">
        <VideoPlayer videoId={videoId} />
        <Comment username={user.username} comments={comments} />
      </div>
      <div className="relatedvids-container">
        <RelatedVideos setComments={setComments} setVideoId={setVideoId} />
      </div>
    </div>
  );
};

export default VideoPage;
