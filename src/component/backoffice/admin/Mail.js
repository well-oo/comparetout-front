import React from "react";
import MaterialTable from "material-table";

const Mail = () => {
    const [state] = React.useState({
        columns: [
            {title: 'Objet', field: 'objet'},
            {title: 'Contenu', field: 'contenu'},
            {title: 'Emetteur', field: 'emetteur'},
            {title: 'Récepteur', field: 'recepteur'},
            {title: 'Date envoi', field: 'dateEnvoie', type: 'datetime'},
        ],
        data : [
            {
                objet: "Info",
                contenu: "Bonjour, ...",
                emetteur:"lesite@lesite.com",
                recepteur:"leclient@leclient.com",
                dateEnvoie:"2019-11-14"
            }
        ]
    });
    return(
        <MaterialTable
            title="Visuel mails"
            columns={state.columns}
            data={state.data}
        />
    )
};

export default Mail;