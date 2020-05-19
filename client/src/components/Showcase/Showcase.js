import React from "react";
import { Link } from "react-router-dom";

import classes from "./Showcase.module.css";

const Showcase = (props) => {
  return (
    <div className={classes.Showcase}>
      <div className={classes.ShowcaseContent}>
        <h1 className={classes.Lheading}>Welcome To TechCommunity</h1>
        <div className={classes.ActionsContainer}>
          <Link to="/login" className={classes.Btn}>
            Login
          </Link>
          <Link
            to="/register"
            className={[classes.Btn, classes.BtnWhite].join(" ")}
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Showcase;
