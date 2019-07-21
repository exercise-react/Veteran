const descriptorNewClient = {
    "ID": '',
    "CreateDate":'',
    "FirstName": '',
    "LastName": '',
    "CityBirth": '',
    "StateBirth": '',
    "ServiceNumber": '',
    "Branch": '',
    "Rank": '',
    "Discharge": '' ,
    "Comments": ''
};

const InitialState = {
    auth: null,
    selectClient: {
        selectClientID: null,
        selectClientData: null,
    },
    edit: false,
    backup: null,
    navigation: null,
    clientForm: null,
    clientData: null,
    descriptor: descriptorNewClient,
};

export default function rootReducer(state = InitialState, action) {
    switch (action.type) {
        case 'LOAD_DATA_NAVIGATION_COMPLETE':
            return {...state, navigation: action.payload};
        case 'LOAD_DATA_CLIENT_FORM_COMPLETE':
            return {...state,  clientForm: action.payload};
        case 'LOAD_CLIENT_DATA_COMPLETE':
            return {...state, clientData: action.payload};
        case 'SELECT_CLIENT':
            const selectClientID = action.payload
                ? action.payload.ID
                : null;
            return {...state, selectClient: {...state.selectClient,
                    selectClientID  : selectClientID,
                    selectClientData: action.payload } };
        case 'ADD_NEW_CLIENT':
            const newClient = action.payload;

           // console.warn('state.clientData[0].slice(2)', Number(state.clientData[0].ID.slice(2)));

            let newId =state.clientData.reduce((acc, curr) => {
                console.warn('acc.ID', acc.ID);
                console.warn('curr.ID', curr.ID);
                 acc = Number(acc.ID.slice(2)) > Number(curr.ID.slice(2))
                    ? acc
                    : curr;
                console.warn('acc', acc);
               return acc
            });
            newId = 'AC'+(Number(newId.ID.slice(2))+1).toString();

            console.warn('newId', newId);

            return {...state, selectClient: {...state.selectClient,
                    selectClientID  : newId ,
                    selectClientData: {...state.descriptor, ID: newId} }};
        case 'EDIT_SELECTED_CLIENT':
            return {...state, backup: state.clientData, edit: true};
        case 'EDITING_SELECTED_CLIENT':
            return {...state, selectClient: {...state.selectClient,
                    selectClientData: action.payload }};
        case 'CANCEL_EDIT_CLIENT':
            return {...state, selectClient: {...state.selectClient,
                    selectClientID  : null,
                    selectClientData: null }, clientData: state.backup, backup: null, edit: false};
        case 'SAVE_COMPLETE_CLIENT':
           let newClientData =  state.clientData.map(client => {
               if (client.ID === state.selectClient.selectClientData.ID) return state.selectClient.selectClientData;
               return client
           });
// добавить в массив если новый клиент добавлен с новым ид
            console.warn('newClientData',newClientData);
            console.warn('условие', newClientData.filter(client => client.ID === state.selectClient.selectClientData.ID
            ));

             if (newClientData.filter(client => client.ID === state.selectClient.selectClientData.ID).length < 1) {

                 newClientData.push(state.selectClient.selectClientData) } ;

            return {...state, selectClient: {...state.selectClient,
                    selectClientID  : null,
                    selectClientData: null }, clientData: newClientData, backup: null, edit: false};

        default:
            return state;
    }
}