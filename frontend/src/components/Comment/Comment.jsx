import CommentForm from "./CommentForm/CommentForm";
import CommentList from "./CommentList/CommentList";
import "./Comment.css";
import { useState } from "react";

const Comment = (props) => {
  const [triger, setTriger] = useState(false);

  return (
    <div>
      <CommentForm setTriger={setTriger} />
      <CommentList passTriger={triger} setTriger={setTriger} />
    </div>
  );
};

export default Comment;
