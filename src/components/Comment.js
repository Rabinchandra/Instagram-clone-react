import React, { useState } from "react";
import { db, timestamp } from "../firebase/config";

function Comment({ id, user }) {
  const [comment, setComment] = useState("");
  const onFormSubmit = (e) => {
    e.preventDefault();
    if (comment) {
      addComment();
      // Clearing comment value
      e.target.firstElementChild.value = "";
    }
  };

  const onCommentChange = (e) => {
    const value = e.target.value;
    const postBtn = e.target.nextElementSibling;
    setComment(value);

    if (value) {
      // if value is not empty
      postBtn.classList.add("comment__enabled");
    } else {
      postBtn.classList.remove("comment__enabled");
    }
  };

  const addComment = () => {
    db.collection("posts").doc(id).collection("comments").add({
      text: comment,
      postedAt: timestamp(),
      username: user.displayName,
    });

    setComment("");
  };

  return (
    <form className="comment__box" onSubmit={onFormSubmit}>
      <input
        type="text"
        placeholder="Add a comment..."
        onChange={onCommentChange}
      />

      <input type="submit" value="Post" />
    </form>
  );
}

export default Comment;
