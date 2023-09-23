import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import { useState } from 'react';

const App = () => {
  const [darkModeOn, setDarkModeOn] = useState(false);
  const toggleDarkMode = () => {
    setDarkModeOn(!darkModeOn);
    document.body.classList.toggle('darkMode', darkModeOn);
  };

  return (
    <div>
      {/* <button className='check' onClick={toggleDarkMode}>Do it</button> */}
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/' element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
