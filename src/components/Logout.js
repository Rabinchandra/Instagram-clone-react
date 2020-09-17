import React from "react";
import { auth } from "../firebase/config";

function Logout() {
  const clickHandler = () => {
    auth
      .signOut()
      .then(() => console.log("Logout successfully!"))
      .catch((err) => console.log(err.message));
  };

  return (
    <div className="logout" onClick={clickHandler}>
      Log out
    </div>
  );
}

export default Logout;
