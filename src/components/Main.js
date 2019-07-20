import React, {lazy, Suspense} from 'react';
import {Switch, Route, BrowserRouter as Router} from 'react-router-dom';


const Home = lazy(() => import('./Home'));

const VeteranInformation = lazy(() => import('./VeteranInformation'));

const Main = () => (
    <main>
        <Router>
            <Switch>
                <Suspense fallback={<div> ...Loading </div>}>
                    <Route exact path='/main' component={VeteranInformation}/>
                    <Route exact path='/logout' component={Home}/>
                </Suspense>
            </Switch>
        </Router>
    </main>
);

export default Main;

