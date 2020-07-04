import React from "react";
import MaterialTable from "material-table";
import {addSupplier, deleteSupplier, getSuppliers, updateSupplier} from "../../../action/SupplierAction";
import {connect} from "react-redux";

    const GestionFournisseur = ({getSuppliers, suppliers, updateSupplier, addSupplier, deleteSupplier}) => {
        const [state] = React.useState({
            columns: [
                {title: 'ID', field: 'id', type: 'numeric',editable: 'never'},
                {title: 'Username', field: 'username', editable: 'onAdd'},
                {
                    title: 'Password',
                    field: 'password',
                    searchable: false,
                    filtering: false,
                    initialEditValue: '',
                    render: () => '********'
                },
                {title: 'Email', field: 'email', type: 'string'},
                {title: 'Nombre de produits', field: 'nbProduits', type: 'numeric', editable: 'never'},
                {title: 'Clé API', field: 'apiKey', editable: 'onUpdate'},
            ]
        });
        if(suppliers == null) getSuppliers();
        let rows = [];
        if(rows.length === 0 && suppliers !== null){
            rows = suppliers.map(elem => {
                return {
                    id: elem.user.id,
                    username: elem.user.username,
                    email: elem.user.email,
                    apiKey: elem.user.apiKey,
                    nbProduits: elem.nbProduits
                }
            });
        }

        return(
            <MaterialTable
                title="Gestion Fournisseurs"
                columns={state.columns}
                data={rows}
                editable={{
                    onRowAdd : newData => new Promise(resolve => {
                        let supplier = {user: newData, nbProduits: 0};
                        addSupplier(suppliers, supplier);
                        resolve();
                    }),
                    onRowUpdate: (newData, oldData) => new Promise(resolve => {
                            let {nbProduits, ...user} = newData;
                            let supplier = {user, nbProduits};
                            updateSupplier(suppliers, supplier);
                            resolve();
                        }),
                    onRowDelete: oldData =>
                        new Promise(resolve => {
                            let {nbProduits, ...user} = oldData;
                            let supplier = {user, nbProduits};
                            deleteSupplier(suppliers, supplier);
                            resolve();
                        })
                    }
                }
            />
        )
};

const mapStateToProps = (state) => {
    return {
        user: state.UserReducer.user,
        suppliers: state.SupplierReducer.suppliers
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getSuppliers: () => dispatch(getSuppliers()),
        updateSupplier: (suppliers, supplier) => dispatch(updateSupplier(suppliers, supplier)),
        addSupplier: (suppliers, supplier) => dispatch(addSupplier(suppliers, supplier)),
        deleteSupplier: (suppliers, supplier) => dispatch(deleteSupplier(suppliers, supplier)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(GestionFournisseur);