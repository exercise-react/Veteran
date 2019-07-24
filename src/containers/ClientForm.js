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
    button: {
        marginRight: theme.spacing(7),
    },
    containerButton: {
        marginTop: theme.spacing(2),
    },
    formControl: {
        margin: theme.spacing(1),
    },
});


class ClientForm extends React.Component {

    constructor(props) {
        super(props);

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
            selectClientData,
            addNewClient,
            classes,
        } = this.props;

        const dataClientForm = Array.isArray(clientForm)
        && clientForm.length > 0
            ? clientForm
            : [];

        const handleChange = name => event => {

            this.editingSelectClientAction({...selectClientData, [name]: event.target.value})
        };

        return (
            <div className='clientForm-container'>
                <div className='text-bold'> Client Form</div>
                {dataClientForm.map((element, index) => {
                    if ('element' in element && element.element) {
                        const {label, placeholder, name, required} = element;
                        const uniqKey = addNewClient
                            ? index
                            : selectClientData[name];
                        console.warn('uniqKey', uniqKey);
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
                                               required = {required}
                                    />)
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
                                               required = {required}
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
                                           required = {required}
                                >

                                    {
                                        items.map(option => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))
                                    }
                                </TextField>
                            )
                        }
                    }
                    return (<></>)
                })}
                <div className='button-container'>
                    <Button onClick={() => {
                        alert(`
                            FirstName: ${selectClientData.FirstName}
                            LastName: ${selectClientData.LastName}
                            CityBirth: ${selectClientData.CityBirth}
                            StateBirth: ${selectClientData.StateBirth}
                            Branch: ${selectClientData.Branch}
                            Rank: ${selectClientData.Rank}
                            Discharge: ${selectClientData.Discharge}
                            Comments: ${selectClientData.Comments}`);

                        return this.saveSelectClientAction()
                    }}
                            variant="contained"
                            color="primary"
                            className={classes.button}>
                        Save
                    </Button>

                    <Button onClick={() => this.cancelEditSelectClientAction()}
                            variant="contained"
                            className='button-cancel'>
                        Cancel
                    </Button>
                </div>
            </div>
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
    addNewClient: state.addNewClient,
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(ClientForm));
