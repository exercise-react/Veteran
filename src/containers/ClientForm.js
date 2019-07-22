import React from 'react';
import {withStyles} from '@material-ui/core/styles/index';
import TextField from "@material-ui/core/TextField/index";
import Button from "@material-ui/core/Button/index";
import {connect} from "react-redux";
import MenuItem from "@material-ui/core/MenuItem";


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
        this.editingSelectClientAction = props.editingSelectClientAction;
        this.saveSelectClientAction = props.saveSelectClientAction;
        this.cancelEditSelectClientAction = props.cancelEditSelectClientAction;
    }

    componentDidMount() {
    }

    render() {
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

        const handleChange = name => event => {

            this.editingSelectClientAction({...selectClientData, [name]: event.target.value})
        };

        return (
            <>
                <div className={classes.container}>
                    {dataClientForm.map((element, index) => {
                        if ('element' in element && element.element) {
                            const {label, placeholder, name} = element;
                            const uniqKey = selectClientData[name] === ''
                                ? index
                                : selectClientData[name];
                            if (element.element === 'input') {
                                if (element.type === 'text') {
                                    return (
                                        <TextField key={uniqKey}
                                                   id="outlined-helperText"
                                                   label={label}
                                                   defaultValue={selectClientData[name]}
                                                   onChange={handleChange(name)}
                                                   className={classes.textField}
                                                   helperText={placeholder}
                                                   margin="normal"
                                                   variant="outlined"
                                        />  )
                                }
                                if (element.type === 'textarea') {
                                    return (
                                        <TextField key={uniqKey}
                                                   multiline
                                                   id="outlined-helperText"
                                                   label={label}
                                                   defaultValue={selectClientData[name]}
                                                   onChange={handleChange(name)}
                                                   className={classes.textField}
                                                   helperText={placeholder}
                                                   margin="normal"
                                                   variant="outlined"
                                        />)
                                }

                            }
                            if (element.element === 'select') {
                                const {items} = element;

                                return (
                                    <TextField key={uniqKey}
                                               id="outlined-select-currency-native"
                                               select
                                               label={label}
                                               className={classes.textField}
                                               value={selectClientData[name]}
                                               onChange={handleChange(name)}
                                               SelectProps={{
                                                   MenuProps: {
                                                       className: classes.menu,
                                                   },
                                               }}
                                               helperText={placeholder}
                                               margin="normal"
                                               variant="outlined"
                                    >

                                        {items.map(option => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                )
                            }
                        }
                    })}

                    <div>
                        <Button onClick={() => this.saveSelectClientAction()}
                                variant="contained"
                                color="primary"
                                className={classes.button}>
                            Save
                        </Button>

                        <Button onClick={() => this.cancelEditSelectClientAction()}
                                variant="contained"
                                className={classes.button}>
                            Cancel
                        </Button>
                    </div>
                </div>
            </>
        )
    }
}


const mapDispatchToProps = dispatch => ({
    editingSelectClientAction: data => dispatch({type: 'EDITING_SELECTED_CLIENT', payload: data}),
    saveSelectClientAction: data => dispatch({type: 'SAVE_COMPLETE_CLIENT', payload: data}),
    cancelEditSelectClientAction: () => dispatch({type: 'CANCEL_EDIT_CLIENT'}),
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
