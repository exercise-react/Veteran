const InitialState = {
    auth: null,
    selectClient: false,
    edit: false,
    backup: null,
    navigation: null,
    clientForm: null,
    clientData: null,
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
            return {...state, selectClient: action.payload};
        case 'ADD_CLIENT':
            const newClient = action.payload;
            return {...state, clientData: [...state.clientData, newClient]};
        case 'EDIT_SELECTED_CLIENT':
            const newClientData = action.payload;
            return {...state, backup: state.clientForm, edit: true, clientData: newClientData};
        case 'CANCEL_EDIT_CLIENT':
            return {...state, clientData: state.backup, backup: null, edit: false};
        case 'SAVE_COMPLETE_CLIENT':
            return {...state, backup: null, edit: false};

        default:
            return state;
    }
}