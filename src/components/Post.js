import React, { useState, useEffect } from "react";
import Avatar from "react-avatar";
import Comment from "./Comment";
import { db } from "../firebase/config";

function Post({ username, imgUrl, caption, id, user }) {
  const [comments, setComments] = useState([]);

  // Get comments of this post
  useEffect(() => {
    const unsub = db
      .collection("posts")
      .doc(id)
      .collection("comments")
      .orderBy("postedAt", "asc")
      .onSnapshot((s) => {
        const documents = [];
        s.docs.forEach((doc) => documents.push(doc.data()));
        setComments(documents);
      });
    return () => {
      unsub();
    };
  }, []);

  return (
    <div className="post">
      <section className="post__header">
        <Avatar
          src=""
          name={username}
          className="post__avatar"
          size="45"
          alt="Post__Avatar"
          round
        />
        <h4>{username}</h4>
      </section>

      <section className="post__image">
        <img src={imgUrl} alt="Post__Image" />
      </section>

      <section className="post__caption">
        <h4>{username}</h4>
        <span>{caption}</span>
      </section>
      <div className="comments">
        {comments.map((c, index) => (
          <div key={index}>
            <strong>{c.username}</strong>
            {c.text}
          </div>
        ))}
      </div>
      {user && <Comment id={id} user={user} />}
    </div>
  );
}

export default Post;
