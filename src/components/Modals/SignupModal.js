import React, { useState } from "react";
import logo from "../../img/instagram.png";
import { auth } from "../../firebase/config";

function SignupModal({ setOpenSignupModal }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const clickHandler = (e) => {
    if (e.target.classList.contains("modal__container")) {
      setOpenSignupModal(false);
    }
  };

  const onSignUp = (e) => {
    e.preventDefault();
    // Register a new user
    auth
      .createUserWithEmailAndPassword(email, password)
      .catch((err) => {
        setMsg(err.message);
        setTimeout(() => setMsg(""), 3000);
      })
      .then((authUser) => {
        if (authUser) {
          authUser.user.updateProfile({
            displayName: username,
          });
          setMsg("User sign up sucessfully!!");
          setTimeout(() => setOpenSignupModal(false), 2000);
        }
      });
  };

  return (
    <div className="modal__container" onClick={clickHandler}>
      <form className="modal" onSubmit={onSignUp}>
        <img src={logo} alt="Logo" />
        <input
          type="text"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input type="submit" value="Sign Up" />
        <div className="msg__box">{msg && msg}</div>
      </form>
    </div>
  );
}

export default SignupModal;
