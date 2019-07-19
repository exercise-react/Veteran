import React, {lazy, Suspense} from 'react';
import {Switch, Route, BrowserRouter as Router} from 'react-router-dom';
// import { Router } from "react-router";


const Home = lazy(() => import('./Home'));

const VeteranInformation = lazy(() => import('./VeteranInformation'));

const Main = () => (
    <main>
        <Router>
            <Switch>
                <Suspense fallback={<div> ...Loading </div>}>
                    <Route path='/home' component={Home}/>
                    <Route path='/veteran-information' component={VeteranInformation}/>
                </Suspense>
            </Switch>
        </Router>
    </main>
);

export default Main;

/*
<Switch>
    <Suspense fallback={<div> ...Loading </div>}>
        <Route path='/home' component={Home}/>
        <Route path='/veteran-information' component={VeteranInformation}/>
    </Suspense>
</Switch>

*/
