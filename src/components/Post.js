import React, { useState, useEffect } from "react";
import Avatar from "react-avatar";
import Comment from "./Comment";
import { db } from "../firebase/config";

function Post({ email, username, imgUrl, caption, id, user, likes }) {
  const [comments, setComments] = useState([]);
  
  const onLike = () => {
    db.collection("posts").doc(id).update({ likes: Array.from(new Set([...likes, user.email])) })
  }

  const onDislike = () => {
    db.collection("posts").doc(id).update({ likes: likes.filter(likerEmail => likerEmail !== user.email) })
  }

  const likeButtonClickHandler = (e) => {
    // if already liked, then dislike
    // else if unliked, then like
    const classList = e.target.classList;
    e.target.classList.remove('animate-icon')
    if(classList.contains('liked')) {
      onDislike();
    } else {
      onLike();
    }
  }

  // Post Image Click
  const postImageClickHandler = (e) => {
    if(!user) return;

    e.preventDefault();

    const element = e.target.parentElement.firstElementChild;
    const postContainer = e.target.parentElement.parentElement;
    const likeButton = postContainer.querySelector('.liked');
    const disLikeButton = postContainer.querySelector('.disliked');

    onLike();
    element.style.display = "flex";
    setTimeout(() => {
      element.style.display = "none";
    }, 1100)

    // Animate like button
    if(likeButton) {
      // if user already liked
      likeButton.classList.remove('animate-icon');
      setTimeout(() => {
        likeButton.classList.add('animate-icon');
      })
    } else {
      // if user didn't like, then remove the animate-icon
      // class from dislike button so that animate-icon on like
      // button works
      if(disLikeButton) {
        disLikeButton.classList.remove('animate-icon');
      }
    }
  }

  const commentIconClickHandler = (e) => {
    const postContainer = e.target.parentElement.parentElement;
    postContainer.querySelector('form input').focus();
  }

  const deletePost = () => {
    if(window.confirm('Are you sure?')) {
      db.collection('posts').doc(id).delete()
      .then(() => alert('Post Deleted Sucessfully'))
      .catch((err) => console.log(err.message));
    }
  }

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
        {user? (user.email === email? 
          (<div className="delete-post__wrapper">
            <i className="fas fa-trash delete-post" onClick={deletePost}></i>
          </div>) : "") : ""}

      </section>

      <section className="post__image" onClick={postImageClickHandler}>
        <div className="giant-like">
          <i className="fas fa-heart animate-giant-icon"></i>
        </div>
        <img src={imgUrl} alt="Post__Image" />
      </section>
      {
        user?
      <div className="post__buttons">
        {likes.includes(user.email)? 
          <i className="fas fa-heart liked animate-icon" onClick={likeButtonClickHandler}></i>
         :
         <i className="far fa-heart disliked animate-icon" onClick={likeButtonClickHandler}></i>}
        <i className="far fa-comment comment-icon" onClick={commentIconClickHandler}></i>
      </div> : ""
      }

      <div className="post__likes-count">
        {likes.length? (likes.length === 1? "1 like" : `${likes.length} likes`) : ''} 
      </div>
      
      
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
