import React from 'react';
import Header from './components/Header';
import SideNav from './containers/SideNav';
import Main from './components/Main';
import theme from './theme';
import './App.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import {BrowserRouter} from "react-router-dom";
import { ThemeProvider } from '@material-ui/styles';


function App() {
    return (
        <BrowserRouter>
            <ThemeProvider  theme={theme}>
                <CssBaseline/>
                <div className='head-container'>
                    <Header className='header-container'/>
                    <div className='content-container'>
                        <SideNav className='sidenav-container'/>
                        <Main className='main-container'/>
                    </div>
                </div>
            </ThemeProvider >
        </BrowserRouter>
    );
}

export default App;
