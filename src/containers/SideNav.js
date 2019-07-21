import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles/index';
import List from '@material-ui/core/List/index';
import ListItem from '@material-ui/core/ListItem/index';
import Collapse from '@material-ui/core/Collapse/index';
import ListItemText from '@material-ui/core/ListItemText/index';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import {Link as RouterLink, NavLink} from 'react-router-dom';
import {data} from '../components/data';
import {createMuiTheme} from '@material-ui/core/styles/index';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';
import {connect} from 'react-redux';
import loadData from '../services/loadData';


const url = 'http://localhost:3000/navigation';

const theme = createMuiTheme({
    palette: {
        primary: purple,
        secondary: green,
    },
    status: {
        danger: 'orange',
    },
});


function ListItemLink(props) {
    const {to, uniqKey, primary, open, ...other} = props;

    return (
        <li key={uniqKey}>
            <ListItem component={NavLink}
                      to={to}
                      {...other}>
                <ListItemText primary={primary}/>
                {open != null ? open ? <ExpandLess/> : <ExpandMore/> : null}
            </ListItem>
        </li>
    );
}

ListItemLink.propTypes = {
    open: PropTypes.bool,
    to: PropTypes.string.isRequired,
};

const styles = theme => {
    return ({
        root: {
            display: 'flex',
            flexDirection: 'column',
            width: 260,
        },
        lists: {
            backgroundColor: theme.palette.background.paper,
            marginTop: theme.spacing(1),
        },
        nested: {
            paddingLeft: theme.spacing(4),
        },
    })
};

class SideNav extends React.Component {

    constructor(props) {
        super(props);
        this.state = {open: true};
        this.loadDataAction = props.loadDataAction;

    }

    componentDidMount() {
        this.loadDataAction(url);
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if (this.props !== nextProps) {
            return true;
        }
        if (this.state !== nextState) {
            return true;
        }
        return false;
    }

    handleClick = () => {
        this.setState(state => ({open: !state.open}));
    };

    render() {
        const {
            navigation
        } = this.props;

        if (!navigation) {
            return <p>Loading...</p>;
        }

        const navigationMap = Array.isArray(navigation)
            && navigation.length > 0
            ? navigation
            : [];

        function MapStructure(props) {
            const nodes = props.navigationMap;
            if (nodes) {
                return nodes.map(node => {
                    if ('subitems' in node
                        && Array.isArray(node.subitems)
                        && node.subitems.length > 0) return childrenMapStructure(node);
                    return (
                        <ListItem key={node.id}
                                  component={RouterLink}
                                  to={node.url}>
                            <ListItemText
                                primary={node.title}/>
                        </ListItem>
                    )
                });
            }
        }

        const childrenMapStructure = (nodesChildren) => (
            <List key={nodesChildren.id}>
                <ListItemLink to={nodesChildren.url}
                              uniqKey={nodesChildren.id}
                              primary={nodesChildren.title}
                              open={this.state.open}
                              onClick={this.handleClick}/>
                {nodesChildren.subitems.map(children => (
                    <Collapse component="li"
                              in={this.state.open}
                              timeout="auto" unmountOnExit
                              key={children.id}
                              className={classes.nested}>
                        <List>
                            <ListItem component={RouterLink}
                                      to={children.url}>
                                <ListItemText primary={children.title}/>
                            </ListItem>
                        </List>
                    </Collapse>))}
            </List>
        );


        const {classes} = this.props;

        return (
            <div className={classes.root}>
                <nav className={classes.lists} aria-label="Mailbox folders">
                    <List>
                        <MapStructure navigationMap={navigationMap}/>
                    </List>
                </nav>
            </div>
        );
    }
}

SideNav.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapDispatchToProps = dispatch => ({
    loadDataAction: anyUrl => dispatch(loadData(anyUrl, 'LOAD_DATA_NAVIGATION_COMPLETE'))
});

const mapStateToProps = state => ({
    navigation: state.navigation,
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(SideNav));
