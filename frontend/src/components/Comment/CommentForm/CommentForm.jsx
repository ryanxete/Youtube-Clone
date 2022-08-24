import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import "./CommentForm.css";

const CommentForm = (props) => {
  const [user, token] = useAuth();
  const { videoId } = useParams();
  const [text, setText] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    let addNew = {
      video_id: videoId,
      text: text,
    };
    await axios.post("http://127.0.0.1:8000/api/comments/", addNew, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    props.setTriger(true);
    setText("");
  }

  return (
    <form className="commentform" onSubmit={handleSubmit}>
      <div>
        <p className="username">
          Username: <span>{user.username}</span>
        </p>
      </div>
      <div>
        <label>
          Comment: <br />
          <textarea
            className="comment-textarea"
            rows={8}
            cols={138}
            type="text"
            value={text}
            onChange={(event) => setText(event.target.value)}
          ></textarea>
        </label>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default CommentForm;
