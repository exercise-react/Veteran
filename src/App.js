import React from 'react';
import Header from './components/Header';
import SideNav from './components/SideNav';
import Main from './components/Main';

import './App.css';

function App() {
    return (
        <div className='head-container'>
            <Header className='header-container'/>
            <main className='main-container'>
                <SideNav className='sidenav-container'/>
                <Main className='main-container'/>
            </main>
        </div>
    );
}

export default App;
