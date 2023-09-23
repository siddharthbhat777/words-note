import React from 'react';
import Routers from './utils/Routers';

const App = () => {
  /* const [darkModeOn, setDarkModeOn] = useState(false);
  const toggleDarkMode = () => {
    setDarkModeOn(!darkModeOn);
    document.body.classList.toggle('darkMode', darkModeOn);
  }; */

  return (
    <div>
      {/* <button className='check' onClick={toggleDarkMode}>Do it</button> */}
      <Routers />
    </div>
  );
};

export default App;
