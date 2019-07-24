import React from 'react';
import {withStyles} from '@material-ui/core/styles/index';
import TextField from "@material-ui/core/TextField/index";
import Button from "@material-ui/core/Button/index";
import {connect} from "react-redux";
import MenuItem from "@material-ui/core/MenuItem";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";


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


class ClientForm extends React.PureComponent {

    constructor(props) {
        super(props);

        this.state = {open: false};

        this.loadDataAction = props.loadDataAction;
        this.editingSelectClientAction = props.editingSelectClientAction;
        this.saveSelectClientAction = props.saveSelectClientAction;
        this.cancelEditSelectClientAction = props.cancelEditSelectClientAction;

        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleClose = this.handleClose.bind(this)
    }

    componentDidMount() {
    }

    handleClickOpen() {
        this.setState({open: true});
    };

    handleClose() {
        this.setState({open: false}, function () {
        });
        this.saveSelectClientAction();
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
                                               required={required}
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
                                               required={required}/>)
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
                                           required={required}>

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
                    <Button onClick={this.handleClickOpen}
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
                    <Dialog
                        open={this.state.open}
                        onClose={this.handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">{"Clients data:"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                FirstName: {selectClientData.FirstName} <br/>
                                LastName: {selectClientData.LastName}<br/>
                                CityBirth: {selectClientData.CityBirth}<br/>
                                StateBirth: {selectClientData.StateBirth}<br/>
                                Branch: {selectClientData.Branch}<br/>
                                Rank: {selectClientData.Rank}<br/>
                                Discharge: {selectClientData.Discharge}<br/>
                                Comments: {selectClientData.Comments}<br/>
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleClose} color="primary" autoFocus>
                                Agree and save
                            </Button>
                        </DialogActions>
                    </Dialog>
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
