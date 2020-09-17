import React, { useState } from "react";
import { auth } from "../../firebase/config";
import logo from "../../img/instagram.png";

function LoginModal({ setUser, setOpenLoginModal }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const clickHandler = (e) => {
    if (e.target.classList.contains("modal__container")) {
      setOpenLoginModal(false);
    }
  };

  const onLogin = (e) => {
    e.preventDefault();

    auth
      .signInWithEmailAndPassword(email, password)
      .then((authUser) => {
        setUser(authUser.user);
        setOpenLoginModal(false);
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <div className="modal__container" onClick={clickHandler}>
      <form className="login__modal modal" onSubmit={onLogin}>
        <img src={logo} alt="Logo" />
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
        <input type="submit" value="Log in" />
      </form>
    </div>
  );
}

export default LoginModal;
