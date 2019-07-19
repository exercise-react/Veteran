// import React from 'react';
// import {BrowserRouter as Router, Link} from 'react-router-dom';
// import Button from '@material-ui/core/Button';

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Link from '@material-ui/core/Link';
import ListItem from '@material-ui/core/ListItem';
import Collapse from '@material-ui/core/Collapse';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { Route, MemoryRouter } from 'react-router';
import { Link as RouterLink } from 'react-router-dom';
import { data } from './data';
import { DynamicNestedItems } from './DynamicNestedItems'




// const breadcrumbNameMap = {
//     '/home': 'home',
//     '/Main': 'Main',
//     '/Clients/veteran-information': 'veteran-information',
//     '/Administration': 'Administration',
//     '/Logout': 'Logout',
// };

const breadcrumbNameMap = {
    '/inbox': 'Inbox',
    '/inbox/important': 'Important',
    '/trash': 'Trash',
    '/spam': 'Spam',
    '/drafts': 'Drafts',

};


function ListItemLink(props) {
    const { to, open, ...other } = props;
    const primary = breadcrumbNameMap[to];

    return (
        <li>
            <ListItem button component={RouterLink} to={to} {...other}>
                <ListItemText primary={primary} />
                {open != null ? open ? <ExpandLess /> : <ExpandMore /> : null}
            </ListItem>
        </li>
    );
}

ListItemLink.propTypes = {
    open: PropTypes.bool,
    to: PropTypes.string.isRequired,
};

const styles = theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        width: 360,
    },
    lists: {
        backgroundColor: theme.palette.background.paper,
        marginTop: theme.spacing(1),
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
});

const LinkRouter = props => <Link {...props} component={RouterLink} />;

export class SideNav extends React.Component {
    state = {
        open: true,
    };

    handleClick = () => {
        this.setState(state => ({ open: !state.open }));
    };

    render() {
        const breadcrumbNameMaping = data !== null
        && 'navigation' in data
        && Array.isArray(data.navigation)
        && data.navigation.length > 0
            ? data.navigation
            : [];

        const { classes } = this.props;

        return (
            <MemoryRouter initialEntries={['/inbox']} initialIndex={0}>
                <div className={classes.root}>
                    <nav className={classes.lists} aria-label="Mailbox folders">
                        {breadcrumbNameMaping.map(node => (
                            <ListItem  key={node.id}>
                                <ListItemLink to={node.url} open={this.state.open} onClick={this.handleClick} />
                            <ListItemText primary={node.title} />
                            </ListItem>
                        ))}
                    </nav>
                </div>
            </MemoryRouter>
        );
    }
}

SideNav.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SideNav);

                        //        primaryText={node.title}
                        //        initiallyOpen //optional
                        // nestedItems={mapStructure(node.subitems)}



//
// <List>
//     <ListItemLink to="/inbox" open={this.state.open} onClick={this.handleClick} />
//     <Collapse component="li" in={this.state.open} timeout="auto" unmountOnExit>
//         <List disablePadding>
//             <ListItemLink to="/inbox/important" className={classes.nested} />
//         </List>
//     </Collapse>
//
// </List>



//
// const SideNav = () => (
//     <nav>
//         <Router>
//         <Link to="/">
//             <Button  color="default" variant="outlined">
//                 Home
//             </Button >
//         </Link>
//         <Link to="/veteran-information">
//             <Button  color="default" variant="outlined">
//                 Veteran information
//             </Button >
//         </Link>
//         </Router>
//     </nav>
// );

// export default SideNav;

