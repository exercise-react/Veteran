import React from 'react';
import {lighten, makeStyles, withStyles} from '@material-ui/core/styles/index';
import Table from '@material-ui/core/Table/index';
import TableBody from '@material-ui/core/TableBody/index';
import TableCell from '@material-ui/core/TableCell/index';
import TableHead from '@material-ui/core/TableHead/index';
import TableRow from '@material-ui/core/TableRow/index';
import TableSortLabel from '@material-ui/core/TableSortLabel/index';
import Paper from '@material-ui/core/Paper/index';
import Button from "@material-ui/core/Button/index";
import {connect} from "react-redux";


function desc(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function stableSort(array, cmp) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = cmp(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
    return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}


const headRows = [
    {id: 'FirstName', numeric: false, disablePadding: true, label: 'Name'},
    {id: 'StateBirth', numeric: false, disablePadding: true, label: 'State Birth'},
    {id: 'Branch', numeric: false, disablePadding: true, label: 'Branch'},
];

const idsHeader = headRows.reduce((acc, curr) => {
    acc.push(curr.id);
    return acc
}, []);


function EnhancedTableHead(props) {
    const { order, orderBy, onRequestSort} = props;
    const createSortHandler = property => event => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>

                {headRows.map(row => (
                    <TableCell
                        key={row.id}
                        align={row.numeric ? 'right' : 'center'}
                        padding={row.disablePadding ? 'none' : 'default'}
                        sortDirection={orderBy === row.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === row.id}
                            direction={order}
                            onClick={createSortHandler(row.id)}
                        >
                            {row.label}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

const useToolbarStyles = makeStyles(theme => ({
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
    },
    button: {
        margin: theme.spacing(1),
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: lighten(theme.palette.secondary.light, 0.85),
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
            },
    spacer: {
        flex: '1 1 100%',
    },
    actions: {
        color: theme.palette.text.secondary,
    },
    title: {
        flex: '0 0 auto',
    },
}));


const styles = theme => ({
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
    },
    button: {
        margin: theme.spacing(1),
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: lighten(theme.palette.secondary.light, 0.85),
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
            },
    spacer: {
        flex: '1 1 100%',
    },
    actions: {
        color: theme.palette.text.secondary,
    },
    title: {
        flex: '0 0 auto',
    },
});


// const styles = theme => ({
//     root: {
//         width: '100%',
//         marginTop: theme.spacing(3),
//     },
//     paper: {
//         width: '100%',
//         marginBottom: theme.spacing(2),
//     },
//     table: {
//         minWidth: 750,
//     },
//     tableWrapper: {
//         overflowX: 'auto',
//     },
// });

class ListClients extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            order: 'asc',
            orderBy: '',
            selected: null,
            page: 0,
            rowsPerPage: 5,
        };

        this.selectRowAction = props.selectRowAction;
        this.editRowAction = props.editRowAction;
        this.cancelEditRowAction = props.cancelEditRowAction;
        this.addNewClientAction = props.addNewClientAction;

        this.setOrder = (value) => {
            this.setState(state => ({...state, order: value}))
        };
        this.setOrderBy = (value) => {
            this.setState(state => ({...state, orderBy: value}))
        };
        this.setSelected = (value) => {
            if (this.state.selected === value.ID) {
                this.setState(state => ({...state, selected: null}));
                this.selectRowAction(null);
                this.cancelEditRowAction()

            } else {
                this.setState(state => ({...state, selected: value.ID}));
                this.selectRowAction(value);
                this.editRowAction(value)
            }
        };
        this.setPage = (value) => {
            this.setState(state => ({...state, page: value}))
        };
        this.setRowsPerPage = (value) => {
            this.setState(state => ({...state, rowsPerPage: value}))
        };


        this.handleChangePage = this.handleChangePage.bind(this);
        this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
        this.handleRequestSort = this.handleRequestSort.bind(this);
        this.handleSelectAllClick = this.handleSelectAllClick.bind(this);
        this.handleClick = this.handleClick.bind(this);

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

    handleChangePage(event, newPage) {
        this.setPage(newPage);
    }

    handleChangeRowsPerPage(event) {
        this.setRowsPerPage(+event.target.value);
        this.setPage(0);
    }


    handleRequestSort(event, property) {
        const isDesc = this.state.orderBy === property && this.state.order === 'desc';
        this.setOrder(isDesc ? 'asc' : 'desc');
        this.setOrderBy(property);
    }

    handleSelectAllClick(event) {
        if (event.target.checked) {
            const newSelecteds = this.rows.map(n => n.name);
            this.setSelected(newSelecteds);
            return;
        }
        this.setSelected(null);
    }

    handleClick(row) {

        if (row) {
            this.setSelected(row);
        }

    }


    render() {
        const rows = Array.isArray(this.props.clientData) && this.props.clientData.length > 0
            ? this.props.clientData
            : [];

        const classes = styles;

        const isSelected = name => {
                return name && this.state.selected && this.state.selected.indexOf(name) !== -1
            }
        ;
        const emptyRows = this.state.rowsPerPage - Math.min(this.state.rowsPerPage, rows.length - this.state.page * this.state.rowsPerPage)

        return (
            <div className={classes.root}>
                <div> Clients (choose row to edit)</div>
                <br />
                <Paper className={classes.paper}>
                    <div className={classes.tableWrapper}>
                        <Table
                            className={classes.table}
                            aria-labelledby="tableTitle"
                            size={'medium'}
                        >
                            <EnhancedTableHead
                                // numSelected={this.state.selected.length}
                                order={this.state.order}
                                orderBy={this.state.orderBy}
                                onSelectAllClick={this.handleSelectAllClick}
                                onRequestSort={this.handleRequestSort}
                                rowCount={rows.length}
                            />
                            <TableBody>
                                {stableSort(rows, getSorting(this.state.order, this.state.orderBy))
                                    .slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage)
                                    .map((currentRow, index) => {
                                        const isItemSelected = isSelected(currentRow.ID);
                                        const labelId = `enhanced-table-checkbox-${index}`;

                                        return (
                                            <TableRow
                                                hover
                                                onClick={event => this.handleClick(currentRow)}
                                                role="checkbox"
                                                aria-checked={isItemSelected}
                                                tabIndex={-1}
                                                key={currentRow.ID}
                                                selected={isItemSelected}
                                            >
                                                {idsHeader.map((idHeader, index) => {
                                                    return (
                                                        <TableCell key={index}
                                                                   align="left">{currentRow[idHeader]}</TableCell>

                                                    )
                                                })}
                                            </TableRow>
                                        );
                                    })}
                                {emptyRows > 0 && (
                                    <TableRow style={{height: 49 * emptyRows}}>
                                        <TableCell colSpan={6}/>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                        <Button className={classes.button}
                                onClick={() => this.addNewClientAction()}>
                            +New</Button>

                    </div>

                </Paper>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    selectRowAction: data => dispatch({type: 'SELECT_CLIENT', payload: data}),
    editRowAction: data => dispatch({type: 'EDIT_SELECTED_CLIENT', payload: data}),
    cancelEditRowAction: () => dispatch({type: 'CANCEL_EDIT_CLIENT'}),
    addNewClientAction: () => dispatch({type: 'ADD_NEW_CLIENT'}),


});

const mapStateToProps = state => ({
    clientData: state.clientData,
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(ListClients));

/*

<TablePagination
    rowsPerPageOptions={[5, 10, 25]}
    component="div"
    count={rows.length}
    rowsPerPage={this.state.rowsPerPage}
    page={this.state.page}
    backIconButtonProps={{
        'aria-label': 'Previous Page',
    }}
    nextIconButtonProps={{
        'aria-label': 'Next Page',
    }}
    onChangePage={this.handleChangePage}
    onChangeRowsPerPage={this.handleChangeRowsPerPage}
/>

*/
