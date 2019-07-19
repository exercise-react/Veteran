import ListItem from "./SideNav";
import React from "react";
import List from '@material-ui/core/List';
import {data} from "./data";



// const mapStructure = (nodes) => {
//     if (nodes) {
//         return nodes.map(node => (
//             <ListItem
//                 key={node.id}
//                 to={node.url}
//                 primaryText={node.title}
//                 initiallyOpen //optional
//                 nestedItems={mapStructure(node.subitems)}>
//                 <ListItemText primary="Spam" />
//             </ListItem>
//         ));
//     }
// };
//
// export const DynamicNestedItems = (dataNav) => {
//    // console.warn('dataNav', dataNav);
//
//     return (
//         <List>
//             {mapStructure(dataNav)}
//         </List>
//     );
// };

