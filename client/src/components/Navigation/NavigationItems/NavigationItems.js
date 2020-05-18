import React from 'react';

import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = () => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" >Developers</NavigationItem>
        
        <NavigationItem link="/">Login</NavigationItem>
        <NavigationItem link="/">SignUp</NavigationItem>
    </ul>
);

export default navigationItems;