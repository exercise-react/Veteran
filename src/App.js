import React from 'react';
import Header from './components/Header';
import SideNav from './containers/SideNav';
import Main from './components/Main';

import './App.css';

function App() {
    return (
        <div className='head-container'>
            <Header className='header-container'/>
            <div className='content-container'>
                <SideNav className='sidenav-container'/>
                <Main className='main-container'/>
            </div>
        </div>
    );
}

export default App;
