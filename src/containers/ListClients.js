import React from 'react';
import PropTypes from 'prop-types';
import {lighten, makeStyles, withStyles} from '@material-ui/core/styles/index';
import Table from '@material-ui/core/Table/index';
import TableBody from '@material-ui/core/TableBody/index';
import TableCell from '@material-ui/core/TableCell/index';
import TableHead from '@material-ui/core/TableHead/index';
import TablePagination from '@material-ui/core/TablePagination/index';
import TableRow from '@material-ui/core/TableRow/index';
import TableSortLabel from '@material-ui/core/TableSortLabel/index';
import Paper from '@material-ui/core/Paper/index';
import Button from "@material-ui/core/Button/index";
import loadData from "../services/loadData";
import {connect} from "react-redux";


const url = 'http://localhost:3000/clientData';



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
    const {onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort} = props;
    const createSortHandler = property => event => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>

                {headRows.map(row => (
                    <TableCell
                        key={row.id}
                        align={row.numeric ? 'right' : 'left'}
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

EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.string.isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

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
        width: '100%',
        marginTop: theme.spacing(3),
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    table: {
        minWidth: 750,
    },
    tableWrapper: {
        overflowX: 'auto',
    },
});

class ListClients extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            order: 'asc',
            orderBy: 'calories',
            selected: [],
            page: 0,
            rowsPerPage: 5,
        };
        this.setOrder = this.setState(value => ({order: value}));
        this.setOrderBy = this.setState(value => ({order: value}));
        this.setSelected = this.setState(value => ({order: value}));
        this.setPage = this.setState(value => ({order: value}));
        this.setRowsPerPage = this.setState(value => ({order: value}));

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

    render() {
        const {
            clientData
        } = this.props;
        const rows = Array.isArray(clientData)
        && clientData.length > 0
            ? clientData
            : [];
        console.warn('rows', rows)

        const classes = styles;


        function handleRequestSort(event, property) {
            const isDesc = this.state.orderBy === property && this.state.order === 'desc';
            this.setOrder(isDesc ? 'asc' : 'desc');
            this.setOrderBy(property);
        }

        function handleSelectAllClick(event) {
            if (event.target.checked) {
                const newSelecteds = rows.map(n => n.name);
                this.setSelected(newSelecteds);
                return;
            }
            this.setSelected([]);
        }

        function handleClick(event, name) {
            const selectedIndex = this.state.selected.indexOf(name);
            let newSelected = [];

            if (selectedIndex === -1) {
                newSelected = newSelected.concat(this.state.selected, name);
            } else if (selectedIndex === 0) {
                newSelected = newSelected.concat(this.state.selected.slice(1));
            } else if (selectedIndex === this.state.selected.length - 1) {
                newSelected = newSelected.concat(this.state.selected.slice(0, -1));
            } else if (selectedIndex > 0) {
                newSelected = newSelected.concat(
                    this.state.selected.slice(0, selectedIndex),
                    this.state.selected.slice(selectedIndex + 1),
                );
            }

            this.setSelected(newSelected);
        }

        function handleChangePage(event, newPage) {
            this.setPage(newPage);
        }

        function handleChangeRowsPerPage(event) {
            this.setRowsPerPage(+event.target.value);
            this.setPage(0);
        }

        const isSelected = name => this.state.selected.indexOf(name) !== -1;

        const emptyRows = this.state.rowsPerPage - Math.min(this.state.rowsPerPage, rows.length - this.state.page * this.state.rowsPerPage);

        return (
            <div className={classes.root}>
                <Paper className={classes.paper}>
                    <div className={classes.tableWrapper}>
                        <Table
                            className={classes.table}
                            aria-labelledby="tableTitle"
                            size={'medium'}
                        >
                            <EnhancedTableHead
                                numSelected={this.state.selected.length}
                                order={this.state.order}
                                orderBy={this.state.orderBy}
                                onSelectAllClick={handleSelectAllClick}
                                onRequestSort={handleRequestSort}
                                rowCount={rows.length}
                            />
                            <TableBody>
                                {stableSort(rows, getSorting(this.state.order, this.state.orderBy))
                                    .slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage)
                                    .map((row, index) => {
                                        const isItemSelected = isSelected(row.id);
                                        const labelId = `enhanced-table-checkbox-${index}`;

                                        return (
                                            <TableRow
                                                hover
                                                onClick={event => handleClick(event, row.name)}
                                                role="checkbox"
                                                aria-checked={isItemSelected}
                                                tabIndex={-1}
                                                key={row.id}
                                                selected={isItemSelected}
                                            >
                                                {idsHeader.map((idHeader, index) => {
                                                    return (
                                                        <TableCell key={index} align="right">{row[idHeader]}</TableCell>

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
                        <Button className={classes.button}>+New</Button>

                    </div>
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
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                </Paper>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    loadDataAction: anyUrl => dispatch(loadData(anyUrl, 'LOAD_CLIENT_DATA_COMPLETE'))
});

const mapStateToProps = state => ({
    clientData: state.clientData,
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(ListClients));