import React from 'react';
import Header from '../components/Header';
import SideNav from '../components/SideNav';
import Main from '../components/Main';
import theme from '../theme';
import CssBaseline from '@material-ui/core/CssBaseline';
import {ThemeProvider} from '@material-ui/styles';
import loadData from "../services/loadData";
import {connect} from "react-redux";
import {Router} from "react-router";
import {createBrowserHistory} from 'history'
import 'typeface-roboto';


const browserHistory = createBrowserHistory();
const url = 'http://localhost:3000/navigation';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open: true,
        };
        this.loadDataAction = props.loadDataAction;
    }

    componentDidMount() {
        this.loadDataAction(url);
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if (this.props !== nextProps) {
            return true;
        }
        return this.state !== nextState;

    }

    render() {
        const {
            navigation
        } = this.props;
        return (
            <Router history={browserHistory}>
                <ThemeProvider theme={theme}>
                    <CssBaseline/>
                    <div className='head-container'>
                        <Header className='header-container'/>
                        <div className='content-container'>
                            <SideNav className='sidenav-container'
                                     navigation={navigation}/>
                            <Main className='main-container'/>
                        </div>
                    </div>
                </ThemeProvider>
            </Router>
        );
    }
}


const mapDispatchToProps = dispatch => ({
    loadDataAction: anyUrl => dispatch(loadData(anyUrl, 'LOAD_DATA_NAVIGATION_COMPLETE'))
});

const mapStateToProps = state => ({
    navigation: state.navigation,
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
