import React from 'react';
import {makeStyles, withStyles} from '@material-ui/core/styles/index';
import TextField from "@material-ui/core/TextField/index";
import Button from "@material-ui/core/Button/index";
import loadData from "../services/loadData";
import {connect} from "react-redux";




const styles = theme => ({
    container: {
        display: 'flex',
        flexDirection: 'column',

    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    formControl: {
        margin: theme.spacing(1),
    },
});


class ClientForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: 'Cat in the Hat',
            age: '',
            multiline: 'Controlled',
            items: 'EUR',
        };
        this.loadDataAction = props.loadDataAction;
    }

    componentDidMount() {

    }

    // shouldComponentUpdate(nextProps, nextState, nextContext) {
    //     console.warn('this.props.selectClient.ID', this.props.selectClient.ID)
    //     console.warn('nextProps.selectClient.ID', nextProps.selectClient.ID)
    //     if (this.props.selectClient.ID !== nextProps.selectClient.ID) {
    //         return true;
    //     }
    //     if (this.state !== nextState) {
    //         return true;
    //     }
    //     return false;
    // }

    handleChange = (name) => (event) => {
       this.setState(state => ({...state, [name]: event.target.value}));
    };

    render()
    {
        const {
            clientForm,
            selectClientID,
            selectClientData,
        } = this.props;

        const dataClientForm = Array.isArray(clientForm)
        && clientForm.length > 0
            ? clientForm
            : [];

        const classes = styles;
        // const initialState = dataClientForm.reduce(acc, curr => {
        //     if ('element' in curr && curr.element && curr.element === 'select') {
        //         acc[curr.name]
        //     }
        // }, {});


        return (
            <>
                <div className={classes.container}>
                    {dataClientForm.map(element => {
                        if ('element' in element && element.element)
                            if (element.element === 'input') {
                                const {label, placeholder, name} = element;
                                return (
                                    <TextField
                                        id="outlined-helperText"
                                        label={label}
                                        defaultValue={selectClientData[name]}
                                        className={classes.textField}
                                        helperText={placeholder}
                                        margin="normal"
                                        variant="outlined"
                                    />
                                )
                            }
                        ;
                        if (element.element === 'select') {
                            const {items, label, placeholder, name} = element;
                            return (
                                <TextField
                                    id="outlined-select-currency-native"
                                    select
                                    label={label}
                                    className={classes.textField}
                                    value={selectClientData[name]}
                                    onChange={this.handleChange(name)}
                                    SelectProps={{
                                        native: true,
                                        MenuProps: {
                                            className: classes.menu,
                                        },
                                    }}
                                    helperText={placeholder}
                                    margin="normal"
                                    variant="outlined"
                                >
                                    {items.map(option => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </TextField>
                            )
                        };
                    })}

                    <div>
                        <Button variant="contained" color="primary" className={classes.button}>
                            Save
                        </Button>

                        <Button variant="contained" className={classes.button}>
                            Cancel
                        </Button>
                    </div>
                </div>
            </>
        )
    }
}


const mapDispatchToProps = dispatch => ({
});

const mapStateToProps = state => ({
    clientForm: state.clientForm,
    selectClientID: state.selectClient.selectClientID,
    selectClientData: state.selectClient.selectClientData,
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(ClientForm));