import React from "react";
import Login from "./Login";
import Signup from "./Signup";
import Logout from "./Logout";
import logo from "../img/instagram.png";
import Avatar from "react-avatar";

function Navbar({ user, setUser, setOpenSignupModal, setOpenLoginModal }) {
  return (
    <div className="navbar">
      <img src={logo} alt="Instagram Logo" />

      <div className="navbar__buttons">
        {user ? (
          <React.Fragment>
            <Avatar
              src={user.photoUrl}
              name={user.displayName}
              size="35"
              className="profile__avatar"
              round
            />
            <Logout />
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Signup setOpenSignupModal={setOpenSignupModal} />{" "}
            <Login setUser={setUser} setOpenLoginModal={setOpenLoginModal} />
          </React.Fragment>
        )}
      </div>
    </div>
  );
}

export default Navbar;
