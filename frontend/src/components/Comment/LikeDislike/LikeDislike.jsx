import { useEffect, useState } from "react";
import "./LikeDislike.css";
import axios from "axios";

const LikeDislike = (props) => {
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);

  useEffect(() => {
    getLikesDislikes();
  }, []);

  async function getLikesDislikes() {
    let response = await axios.get(
      `http://127.0.0.1:8000/api/comments/likes_dislikes/${props.commentId}/`
    );
    setLikes(response.data.likes);
    setDislikes(response.data.dislikes);
  }

  async function addLike() {
    let likes = await axios.patch(
      `http://127.0.0.1:8000/api/comments/add_like/${props.commentId}/`
    );
    setLikes(likes.data);
    getLikesDislikes();
  }

  async function addDislike() {
    let dislikes = await axios.patch(
      `http://127.0.0.1:8000/api/comments/add_dislike/${props.commentId}/`
    );
    setDislikes(dislikes.data);
    getLikesDislikes();
  }

  return (
    <div className="like-dislike-container">
      <div className="like-background">
        <button className="likes-counter" onClick={addLike}>
          <img src={require("../LikeDislike/assets/thumb-up.png")} />
        </button>
        <p>{likes}</p>
      </div>

      <div className="dislike-background">
        <button className="dislikes-counter" onClick={addDislike}>
          <img src={require("../LikeDislike/assets/thumb-down.png")} />
        </button>
        <p>{dislikes}</p>
      </div>
    </div>
  );
};
export default LikeDislike;
