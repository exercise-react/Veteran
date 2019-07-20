import React from 'react';
import {data} from "../components/data";
import {makeStyles} from '@material-ui/core/styles/index';
import TextField from "@material-ui/core/TextField/index";
import Button from "@material-ui/core/Button/index";


const useStyles = makeStyles(theme => ({
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
}));

const dataClientForm = data
&& 'clientForm' in data
&& Array.isArray(data.clientForm)
&& data.clientForm.length > 0
    ? data.clientForm
    : [];


function ClientForm() {

    const classes = useStyles();
    // const initialState = dataClientForm.reduce(acc, curr => {
    //     if ('element' in curr && curr.element && curr.element === 'select') {
    //         acc[curr.name]
    //     }
    // }, {});

    const [values, setValues] = React.useState({
        name: 'Cat in the Hat',
        age: '',
        multiline: 'Controlled',
        items: 'EUR',
    });

    const handleChange = name => event => {
        console.warn('event.target.value',event.target.value )
        setValues({ ...values, [name]: event.target.value });
    };

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
                                defaultValue={name}
                                className={classes.textField}
                                helperText={placeholder}
                                margin="normal"
                                variant="outlined"
                            />
                        )};
                    if (element.element === 'select') {
                        const {items, label, placeholder, name} =element;
                        return (
                        <TextField
                            id="outlined-select-currency-native"
                            select
                            label={label}
                            className={classes.textField}
                            value={values[name]}
                            onChange={handleChange(name)}
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
                    )};

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

export default ClientForm;
