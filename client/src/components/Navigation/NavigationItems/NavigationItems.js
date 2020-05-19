import React from 'react';

import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = () => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" >Developers</NavigationItem>
        <NavigationItem link="/posts" >Posts</NavigationItem>
        
        <NavigationItem link="/login">Login</NavigationItem>
        <NavigationItem link="/register">SignUp</NavigationItem>
    </ul>
);

export default navigationItems;