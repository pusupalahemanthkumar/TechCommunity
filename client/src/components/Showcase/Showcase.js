import React from "react";
import classes from "./Showcase.module.css";

const Showcase = (props) => {
  return (
    <div className={classes.Showcase}>
      <div className={classes.ShowcaseContent}>
        <h1 className={classes.Lheading}>Welcome To TechCommunity</h1>
        <div className={classes.ActionsContainer}>
          <a href="/" className={classes.Btn} >
            Login
          </a>
          <a href="/" className={[classes.Btn,classes.BtnWhite].join(" ")}>
            Register
          </a>
        </div>
      </div>
    </div>
  );
};

export default Showcase;
