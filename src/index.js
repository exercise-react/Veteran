import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import CssBaseline from '@material-ui/core/CssBaseline';
import {ThemeProvider} from '@material-ui/styles';
import theme from './theme';
import {BrowserRouter} from "react-router-dom";
import {Provider} from 'react-redux';
import {applyMiddleware, createStore} from "redux";
import thunk from "redux-thunk";
import {createLogger} from 'redux-logger';
import rootReducer from './reducers/index';


const middleware = [thunk];
if (process.env.NODE_ENV !== 'production') {
    middleware.push(createLogger());
}
const store = createStore(rootReducer, applyMiddleware(...middleware));


ReactDOM.render(
    <>

        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <BrowserRouter>
                <Provider store={store}>
                    <App/>
                </Provider>
            </BrowserRouter>
        </ThemeProvider>
    </>, document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
