import React from "react";

function Signup({ setOpenSignupModal }) {
  const clickHandler = () => {
    // Open signup Modal
    setOpenSignupModal(true);
  };

  return (
    <div className="signup" onClick={clickHandler}>
      Sign up
    </div>
  );
}

export default Signup;
