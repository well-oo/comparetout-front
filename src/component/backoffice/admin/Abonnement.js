import React from "react";
import MaterialTable from "material-table";

const Abonnement = () => {
    const [state] = React.useState({
        columns: [
            {title: 'Email', field: 'email'},
            {title: 'Recherche', field: 'recherche'},
            {title: 'Redondance', field: 'redondance'},
        ],
        data : [
            {
                email: "toto@email.com",
                recherche: "Description de la recherche correspondante",
                redondance:"Toutes les semaines",
            }
        ]
    });
    return(
        <MaterialTable
            title="Abonnements"
            columns={state.columns}
            data={state.data}
        />
    )
};

export default Abonnement;