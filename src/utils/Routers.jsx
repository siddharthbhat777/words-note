import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from '../components/Login';
import Home from '../components/Home';

const Routers = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/login' element={<Login />} />
                <Route path='/' element={<Home />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Routers;