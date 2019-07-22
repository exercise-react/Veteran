import React from 'react';
import ListClients from './ListClients';
import ClientForm from './ClientForm';
import {connect} from "react-redux";
import loadData from "../services/loadData";

const urlClientData = 'http://localhost:3000/clientData';
const urlClientForm = 'http://localhost:3000/clientform';

class VeteranInformation extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            order: 'asc',
            orderBy: 'calories',
            selected: null,
            page: 0,
            rowsPerPage: 5,
        };
        this.loadDataAction = props.loadDataAction;
    }

    componentDidMount() {
        this.loadDataAction(urlClientData, 'LOAD_CLIENT_DATA_COMPLETE');
        this.loadDataAction(urlClientForm, 'LOAD_DATA_CLIENT_FORM_COMPLETE');
    }

    // shouldComponentUpdate(nextProps, nextState, nextContext) {
    //     //     console.warn('this.props.selectClientID', this.props.selectClientID);
    //     //     console.warn('nextProps.selectClientID', nextProps.selectClientID)
    //     //     if (this.props.selectClientID
    //     //         && nextProps.selectClientID) {
    //     //         console.warn('this.props.selectClient.ID', this.props.selectClientID)
    //     //         console.warn('nextProps.selectClient.ID', nextProps.selectClientID)
    //     //         if (this.props.selectClientID !== nextProps.selectClientID) {
    //     //             return true;
    //     //         }
    //     //     }
    //     //
    //     //     if (this.state !== nextState) {
    //     //         return true;
    //     //     }
    //     //     return false;
    //     // }

    render() {
        const dataClient = this.props.selectClientID;
        console.warn('dataClient', dataClient)
        if (dataClient) return (
            <>
                <ListClients/>
                <ClientForm/>
            </>
            );

        return (
            <>
                <ListClients/>
            </>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    loadDataAction: (anyUrl, action) => dispatch(loadData(anyUrl, action)),

});

const mapStateToProps = state => ({
    selectClientID: state.selectClient.selectClientID,
    selectClientData: state.selectClient.selectClientData,
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(VeteranInformation);