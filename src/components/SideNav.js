import React, {useState} from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List/index';
import ListItem from '@material-ui/core/ListItem/index';
import Collapse from '@material-ui/core/Collapse/index';
import ListItemText from '@material-ui/core/ListItemText/index';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import {Link as RouterLink} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import 'typeface-roboto';


const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        minWidth: 300,
        maxWidth: 300,
    },

lists: {
    backgroundColor: theme.palette.background.paper,
        marginTop: theme.spacing(1),
},
    nested: {
        paddingLeft: theme.spacing(2),
    },
}));


 function ListItemLink(props) {
    const {to, uniqKey, primary, open, ...other} = props;

    return (
        <li key={uniqKey}>
            <ListItem component='a'
                      className='navLink'
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


export default function SideNav(props)  {
    const classes = useStyles();

    const [openNav, setNavOpen] = useState(true);


  const  handleClick = () => {
      setNavOpen(!openNav);
    };


        const {
            navigation
        } = props;

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
                              open={openNav}
                              onClick={handleClick}/>
                {nodesChildren.subitems.map(children => (
                    <Collapse component="li"
                              in={openNav}
                              timeout="auto" unmountOnExit
                              key={children.id}
                              className={classes.nested}>
                        <List dense={true}>
                            <ListItem component={RouterLink}
                                      to={children.url}>
                                <ListItemText primary={children.title}/>
                            </ListItem>
                        </List>
                    </Collapse>))}
            </List>
        );



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

