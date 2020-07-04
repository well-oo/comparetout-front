import React from "react";
import MaterialTable from "material-table";

const GestionMesure = () => {
    const [state] = React.useState({
        columns: [
            {title: 'Valeur', field: 'valeur'},
            {title: 'Type produit', field: 'typeProduit', editable:'never'},
            {title: 'Critère', field: 'critere', editable:'never'},
        ],
        data : [
            {
                valeur: "km",
                typeProduit: "Voiture",
                critere:"Kilométrage",
            },
            {
                valeur: "€",
                typeProduit: "Voiture",
                critere:"Prix",
            },
            {
                valeur: "€",
                typeProduit: "Téléphone",
                critere:"Prix",
            }
        ]
    });
    return(
        <MaterialTable
            title="Gestion mesures"
            columns={state.columns}
            data={state.data}
            editable={{
                onRowAdd : newData => console.log("new data"),
                onRowUpdate: (newData, oldData) => console.log("update"),
                onRowDelete: oldData => console.log("deleted data")
            }}
        />
    )
};

export default GestionMesure;