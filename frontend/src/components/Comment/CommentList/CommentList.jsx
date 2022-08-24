import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./CommentList.css";
import LikeDislike from "../LikeDislike/LikeDislike";

const CommentList = (props) => {
  const { videoId } = useParams();
  const [comments, setComments] = useState([]);

  useEffect(() => {
    displayComment();
  }, [props.passTriger === true]);

  async function displayComment() {
    let response = await axios.get(
      `http://127.0.0.1:8000/api/comments/all/${videoId}/`
    );
    setComments(response.data);
    props.setTriger(false);
  }

  return (
    <div>
      <p className="commentslist">Comments List: </p>
      <div className="commentlist">
        {comments.map(function (comment, index) {
          return (
            <div key={index} className="eachcomment">
              <p>
                Userame: <span>{comment.user.username}</span>
              </p>
              <div className="commenttext-label">
                Comment:
                <br />
              </div>
              <div className="commenttext-container">
                <div className="commenttext">
                  <p>{comment.text}</p>
                </div>
                <LikeDislike commentId={comment.id} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CommentList;
