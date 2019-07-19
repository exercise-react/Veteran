import React from 'react';
import {BrowserRouter as Router, Link} from 'react-router-dom';
import Fab from '@material-ui/core/Fab';


const SideNav = () => (
    <nav>
        <Router>
        <Link to="/">
            <Fab color="default" variant="extended">
                <span>Home</span>
            </Fab>
        </Link>
        <Link to="/veteran-information">
            <Fab color="default" variant="extended">
                <span>Veteran information</span>
            </Fab>
        </Link>
        </Router>
    </nav>
);

export default SideNav;

