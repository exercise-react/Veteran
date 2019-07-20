import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Collapse from '@material-ui/core/Collapse';
import ListItemText from '@material-ui/core/ListItemText';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import {Link as RouterLink, NavLink} from 'react-router-dom';
import {data} from './data';
import { createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';


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
    console.warn('theme', theme)
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
})};

class SideNav extends React.Component {
    state = {
        open: true,
    };

    handleClick = () => {
        this.setState(state => ({open: !state.open}));
    };

    render() {
        const breadcrumbNameMaping = data
        && 'navigation' in data
        && Array.isArray(data.navigation)
        && data.navigation.length > 0
            ? data.navigation
            : [];

        function MapStructure(props) {
            const nodes = props.breadcrumbNameMaping;
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
                        <MapStructure breadcrumbNameMaping={breadcrumbNameMaping}/>
                    </List>
                </nav>
            </div>
        );
    }
}

SideNav.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SideNav);
