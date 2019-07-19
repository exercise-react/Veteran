import React from 'react';
import ListClients from '../components/ListClients';
import ClientForm from '../components/ClientForm';

const VeteranInformation = () => (
    <>
        <div>
            Clients (Choose row to edit)
        </div>
        <ListClients />
        <ClientForm />

    </>
);

export default VeteranInformation;
