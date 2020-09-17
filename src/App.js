import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Post from "./components/Post";
import SignupModal from "./components/Modals/SignupModal";
import LoginModal from "./components/Modals/LoginModal";
import ImageUpload from "./components/ImageUpload";
import { auth } from "./firebase/config";
import useFirestore from "./firebase/useFirestore";

function App() {
  const [user, setUser] = useState(null);
  const [openSignupModal, setOpenSignupModal] = useState(false);
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [posts, setPosts] = useState([]);
  const firestorePosts = useFirestore("posts");

  // For user
  useEffect(() => {
    const unsub = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });

    return () => {
      unsub();
    };
  }, []);

  // For posts
  useEffect(() => {
    if (firestorePosts !== null) {
      console.log(firestorePosts);
      setPosts(firestorePosts);
    }
  }, [firestorePosts]);

  return (
    <div className="App">
      <Navbar
        user={user}
        setUser={setUser}
        setOpenSignupModal={setOpenSignupModal}
        setOpenLoginModal={setOpenLoginModal}
      />

      {user && <ImageUpload user={user} />}

      {posts.map((post) => (
        <Post
          key={post.id}
          id={post.id}
          username={post.username}
          imgUrl={post.imgUrl}
          user={user}
          caption={post.caption}
          comments={posts.comments}
        />
      ))}

      {openSignupModal && (
        <SignupModal setOpenSignupModal={setOpenSignupModal} />
      )}

      {openLoginModal && (
        <LoginModal setOpenLoginModal={setOpenLoginModal} setUser={setUser} />
      )}
    </div>
  );
}

export default App;
