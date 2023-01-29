import React from 'react'
import Navbar from '../components/NavBar';
import { Outlet } from 'react-router-dom';

const Root = () => {
    return (
        <>
            <Navbar />
            <div>Home</div>

            <div id="detail">
                <Outlet />
            </div>
        </>
    );
}

export default Root;