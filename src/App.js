import React, { Fragment, useEffect, useState } from 'react';
import Routers from './utils/Routers';
import classes from './App.module.css';
import sunImage from './assets/sun.png';
import moonImage from './assets/moon.png';

const App = () => {
  const [darkModeOn, setDarkModeOn] = useState(window.matchMedia('(prefers-color-scheme: dark)').matches);

  const toggleDarkMode = () => {
    setDarkModeOn(!darkModeOn);
  };

  useEffect(() => {
    document.body.classList.toggle('darkMode', darkModeOn);
  }, [darkModeOn]);

  return (
    <Fragment>
      <div className={classes.darkModeButton}>
        <label className={classes.darkModeSwitch}>
          <input type="checkbox" checked={darkModeOn} onChange={toggleDarkMode} />
          <span className={`${classes.slider} ${classes.round}`}></span>
          <img
            className={`${classes.sunMoonImage} ${darkModeOn ? classes.moon : classes.sun}`}
            src={darkModeOn ? moonImage : sunImage}
            alt={darkModeOn ? 'Moon' : 'Sun'}
          />
        </label>
      </div>
      <Routers />
    </Fragment>
  );
};

export default App;
