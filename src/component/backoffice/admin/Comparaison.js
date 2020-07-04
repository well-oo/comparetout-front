import React from "react";
import MaterialTable from "material-table";

const Comparaison = () => {
    const [state] = React.useState({
        columns: [
            {title: 'Nom', field: 'nom'},
            {title: 'Type de donnée', field: 'typeDonnee'},
            {title: 'Type de comparaison', field: 'typeComparaison'},
        ],
        data : [
            {
                nom: "Range nombre",
                typeDonnee: "Nombre",
                typeComparaison:"Range",
            },
            {
                nom: "Liste de valeurs possibles",
                typeDonnee: "Textuel",
                typeComparaison:"Enum",
            }
        ]
    });
    return(
        <MaterialTable
            title="Visuel méthodes de comparaison"
            columns={state.columns}
            data={state.data}
        />
    )
};

export default Comparaison;