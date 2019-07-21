import React, {lazy, Suspense} from 'react';
import {Switch, Route, BrowserRouter as Router} from 'react-router-dom';


const Home = lazy(() => import('./Home'));

const VeteranInformation = lazy(() => import('../containers/VeteranInformation'));

const Main = () => (
    <main>
        <Router>
            <Switch>
                <Suspense fallback={<div> ...Loading </div>}>
                    <Route exact path='/clients/veteran-information' component={VeteranInformation}/>
                    <Route exact path='/' component={Home}/>
                </Suspense>
            </Switch>
        </Router>
    </main>
);

export default Main;

