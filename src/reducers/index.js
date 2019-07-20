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
        case 'LOAD_DATA_COMPLETE':
        const {navigation, clientForm, clientData} = action.payload;
            return {...state, navigation, clientForm, clientData};
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