import './Layout.scss'
import React from 'react';
import { Outlet } from 'react-router-dom'
import Sidebar from "../Sidebar/Sidebar.jsx";
const Layout = () => {
    return (
        <div className="layout-container">
            <Sidebar />
            <div className='content'>
                <Outlet />
            </div>
        </div>
    );
}

export default Layout;