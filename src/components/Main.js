import React, {lazy, Suspense} from 'react';
import {Switch, Route} from 'react-router-dom';


const Home = lazy(() => import('./Home'));

const VeteranInformation = lazy(() => import('../containers/VeteranInformation'));

const Main = () => (
    <div className='main-container'>
            <Switch>
                <Suspense fallback={<div> ...Loading </div>}>
                    <Route exact path='/clients/veteran-information' component={VeteranInformation}/>
                    <Route exact path='/' component={Home}/>
                </Suspense>
            </Switch>
    </div>
);

export default Main;

