import React from "react";

function Login({ setOpenLoginModal }) {
  const clickHandler = () => {
    // Open Login Modal
    setOpenLoginModal(true);
  };

  return (
    <div className="login" onClick={clickHandler}>
      Log in
    </div>
  );
}

export default Login;
