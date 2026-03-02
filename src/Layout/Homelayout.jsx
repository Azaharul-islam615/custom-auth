import React from 'react';
import { Outlet } from 'react-router';
import Nav from '../Component/Nav';

const Homelayout = () => {
    return (
        <div>
            <Nav></Nav>
            <Outlet></Outlet>

        </div>
    );
};

export default Homelayout;