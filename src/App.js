import React, { useEffect, useState } from 'react';
import Routers from './utils/Routers';
import classes from './App.module.css';

const App = () => {
  const [darkModeOn, setDarkModeOn] = useState(false);
  const toggleDarkMode = () => {
    setDarkModeOn(!darkModeOn);
  };

  useEffect(() => {
    document.body.classList.toggle('darkMode', darkModeOn);
  }, [darkModeOn])

  return (
    <div>
      <button className={classes.darkModeButton} onClick={toggleDarkMode}>Do it</button>
      <Routers />
    </div>
  );
};

export default App;
