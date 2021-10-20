import React, { useEffect, useState } from "react";
import "./Nav.css";

function Nav() {
  const [show, handleShow] = useState(false);
  /** When I'm 100px down on y-axis Nav Bar should be shown Black.
   *
   */
  useEffect(() => {
    /** listening - Scroll Event */
    window.addEventListener("scroll", () => {
      /** If I am scrolling down 100 px - fire event */
      if (window.scrollY > 100) {
        handleShow(true);
      } else handleShow(false);
    });
    return () => {
      /** Every time we are firing event we are removing it So that we don't get 20 listener */
      window.removeEventListener("scroll");
    };
  }, []);

  return (
    /** I always want "nav" class BUT if show- variable is true append "nav_black" class to "nav" */
    <div className={`nav ${show && "nav_black"}`}>
      <img
        className="nav_logo"
        src="https://1000logos.net/wp-content/uploads/2017/05/Netflix-Logo.png"
        alt="Netflix Logo"
      />
      <img
        className="nav_avatar"
        src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
        alt="Netflix Logo"
      />
    </div>
  );
}

export default Nav;
