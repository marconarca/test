import React from 'react';
import classes from './Layout.module.css';
import Search from '../Header/Search';
import Main from './Main';

const Layout = () => {
  return (
    <main className={classes.container}>
      <div className={classes.wrapper}>
        <Search />
        <Main />
      </div>
    </main>
  );
};

export default Layout;
