import React from 'react';

import classes from './Logo.module.css';

const logo = (props) => (
    <div className={classes.Logo} >
        <span style={{color:'#37a08e'}}><i className="fas fa-laptop-code"></i>Tech</span>Community
    </div>
);
export default logo;