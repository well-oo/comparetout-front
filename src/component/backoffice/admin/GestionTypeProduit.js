import React from "react";
import MaterialTable from "material-table";
import {connect} from "react-redux";
import {
    createProductType,
    deleteProductType,
    getAllProductType,
    updateProductType
} from "../../../action/ProductTypeAction";
import {getAllCriteres} from "../../../action/CritereAction";
import SelectMultipleCriteria from "../../../helper/SelectMultipleCriteria";
import Truncate from "react-truncate";

const GestionTypeProduit = ({productsType, getAllProductsType, createProductType, deleteProductType, updateProductType, criteres, getAllCriteres}) => {
    let colonne = [
        {title: 'Nom', field: 'name'},
        {title: 'Header image', field: 'headerImage', render: rowData => <img alt={rowData.name} src={rowData.headerImage} style={{width: 50}}/>},
        {title: 'Favicon', field: 'favicon'},
        {title: 'Titre WebPage', field: 'titleWebPage'}
    ];

    if(productsType === null) getAllProductsType();
    if(criteres === null) getAllCriteres();
    else {
        colonne = [
            ...colonne,
            {
                title: 'Criteres',
                field: 'criteres',
                editComponent : (props) => (<SelectMultipleCriteria row={props} isMultiple={true}/>),
                render: rowData => <Truncate  width={250}>{rowData.criteriaList.map(c=>c.name).join(", ")}</Truncate>
            },
        ]
    }

    return (
        <MaterialTable
            title="Types de produits"
            columns={colonne}
            data={(productsType===null ? []: productsType)}
            editable={{
                onRowAdd: newData => new Promise(resolve => {
                    let newProductType = {
                        name: newData.name,
                        headerImage: newData.headerImage,
                        favicon: newData.favicon,
                        titleWebPage: newData.titleWebPage,
                        criteriaList: criteres.filter(c => newData.criteres.includes(c.name))
                    };
                    createProductType(productsType,newProductType);
                    resolve();
                }),
                onRowUpdate: (newData, oldData) => new Promise(resolve => {
                    let newProductType = {
                        ...productsType.find(p => p.idProductType === newData.idProductType),
                        name: newData.name,
                        headerImage: newData.headerImage,
                        favicon: newData.favicon,
                        titleWebPage: newData.titleWebPage,
                        criteriaList : criteres.filter(c => newData.criteres.includes(c.name))
                    };
                    console.log(newProductType)
                    //updateProductType(productsType.map(p => (p.idProductType !== newProductType.idProductType)?  p: newProductType),newProductType);
                    resolve();
                }),
                onRowDelete: oldData => new Promise(resolve => {
                    let index = productsType.findIndex(p => p.idProductType === oldData.idProductType);
                    deleteProductType([...productsType.slice(0, index), ...productsType.slice(index+1)],oldData.idProductType);
                    resolve();
                })
            }}
        />
    )
};

const mapStateToProps = state => {
    return {
        productsType: state.ProductTypeReducer.productsType,
        criteres: state.CritereReducer.criteres
    }
};

const mapDispatchToProps = dispatch => {
    return {
        getAllProductsType : () => dispatch(getAllProductType()),
        createProductType: (productsType, productType) => dispatch(createProductType(productsType, productType)),
        deleteProductType: (productsType, idProductType) => dispatch(deleteProductType(productsType, idProductType)),
        updateProductType: (productsType, productType) => dispatch(updateProductType(productsType, productType)),
        getAllCriteres: () => dispatch(getAllCriteres())
    }
};

export default connect(mapStateToProps, mapDispatchToProps) (GestionTypeProduit);