import React, {Fragment} from "react";
import MaterialTable from "material-table";
import FormControl from "@material-ui/core/FormControl";
import {InputLabel} from "@material-ui/core";
import Select from "@material-ui/core/Select";
import {connect} from "react-redux";
import {getAllProductType} from "../../../action/ProductTypeAction";
import {addProduct, deleteProduct, getProductsByProductType, updateProduct} from "../../../action/ProductAction";
import Truncate from "react-truncate";
import Moment from "react-moment";

const GestionProduit = ({productsType, getAllProductsType, products, getProductsByProductType, addProd, deleteProd, user, updateProd}) => {
    const [state, setState] = React.useState({
        typeProduit: 0,
        columns: [
            {title: 'Image', field: 'picture', render: rowData => <img alt={rowData.name} src={rowData.picture} style={{width: 50}}/>},
            {title: 'Description', field: 'description', render: rowData => <Truncate width={250} >{rowData.description}</Truncate>},
            {title: 'Date d\'ajout', field: 'addProduct', type: 'datetime', editable: 'onAdd', render: rowData => <Moment format="DD/MM/YYYY, h:mm:ss">{rowData.addProduct}</Moment>},
        ]
    });
    let rows = [];
    if(productsType === null) getAllProductsType();
    if(products === null || state.typeProduit ===0) products = [];

    const handleChange = name => event => {

        if(name === "typeProduit" && event.target.value !== "0"){
            getProductsByProductType(parseInt(event.target.value));
        }
        let columns_criteria = productsType
            .find(ptype => ptype.idProductType === parseInt(event.target.value))
            .criteriaList.map(critere => {
                let title = (critere.mesure !== "")? critere.name + " ("+critere.mesure+")": critere.name;
                return {
                    title: title,
                    field: critere.name,
                    criteria: true,
                    type: (critere.comparisonMethod.dataType.name === "Nombre")? 'numeric': 'string',
                    required: critere.estObligatoire
                }
            });
        setState({
            ...state,
            [name]:event.target.value,
            columns : [...state.columns.slice(0,3), ...columns_criteria.sort((a, b) => b.required-a.required)]
        });
    };

    if(rows.length === 0 && products !== null){
        let criteriaValues = products.map(product => {
            return product.valueCriteriaProductList.map(valueCriteriaProduct => {
                let value = (valueCriteriaProduct.value === null) ? "": valueCriteriaProduct.value;
                if(valueCriteriaProduct.criteria.comparisonMethod.dataType.name === "Nombre"){
                    value = parseFloat(value);
                }
                return {
                    [valueCriteriaProduct.criteria.name] : value
                }})
                .reduce((obj, item) => {
                    return{
                        ...obj,
                        [Object.keys(item)[0]]: Object.values(item)[0]
                    }
                }, {});
        });
        rows = criteriaValues.map((c,index)=>{
            let product = products[index];
            return {
                ...c,
                id: product.idProduct,
                name: product.name,
                price: product.price,
                description: product.description,
                picture: product.picture,
                addProduct: product.addProduct
            }
        });
    }
    return(
        <Fragment>
            <FormControl style={{marginBottom:20, width: "80%"}}>
                <InputLabel
                    htmlFor="typeProduit-native-simple"
                    margin='dense'
                >
                    Type produit
                </InputLabel>
                { productsType === null ? <div>Chargement...</div>:
                    <Select
                        native
                        value={state.typeProduit}
                        onChange={handleChange('typeProduit')}
                        inputProps={{
                            name: 'typeProduit',
                            id:'typeProduit-native-simple'
                        }}
                    >
                        <option value={0} disabled>Veuillez saisir le type de produit</option>
                        {
                            productsType.map((p,i) => {
                                return <option key={i} value={p.idProductType}>{p.name}</option>
                            })
                        }
                    </Select>
                }
            </FormControl>
            { products === null ? <div>Chargement...</div>:
                <MaterialTable
                    title="Gestion Produits"
                    columns={state.columns}
                    data={rows}
                    style={{whiteSpace: "nowrap", overflow: "hidden",textOverflow:"ellipsis", width: "auto"}}
                    options={{debounceInterval: 500}}
                    editable={{
                        onRowAdd: newData => new Promise(resolve => {
                            let typeProduit = productsType.find(ptype => ptype.idProductType === parseInt(state.typeProduit));
                            let columnsCriteria = state.columns.filter(c => c.criteria);
                            let valueCriteriaProductList = columnsCriteria.map(c => {
                                let key = c.title;
                                let criteria = typeProduit.criteriaList.find(criteria => criteria.name === key);
                                return {
                                     criteria: criteria,
                                     value: newData[key]
                                }
                            });

                            let newProduct = {
                                productType: typeProduit,
                                user: user,
                                valueCriteriaProductList: valueCriteriaProductList,
                                addProduct: newData.addProduct,
                                description: newData.description,
                                picture: newData.picture,
                            };

                            addProd(products, newProduct);
                            getProductsByProductType(parseInt(state.typeProduit));
                            resolve();
                        }),
                        onRowUpdate: (newData, oldData) => new Promise(resolve => {
                            let index = products.findIndex(p => p.idProduct === oldData.id);
                            let product = products[index];
                            let valueCriteriaPList = product.valueCriteriaProductList.map(valueCriteria => {
                                return {
                                    ...valueCriteria,
                                    value: newData[valueCriteria.criteria.name]
                                }
                            });
                            let newProduct = {
                                ...product,
                                description: newData.description,
                                picture: newData.picture,
                                valueCriteriaProductList: valueCriteriaPList
                            };
                            updateProd(products.map(p => (p.idProduct !== newProduct.idProduct)?  p: newProduct),newProduct);
                            resolve();
                        }),
                        onRowDelete: oldData => new Promise(resolve => {
                            let index = products.findIndex(p => p.idProduct === oldData.id);
                            deleteProd([...products.slice(0, index), ...products.slice(index+1)],oldData.id);
                            resolve();
                        })
                    }}
                />
            }
        </Fragment>
    )
};

const mapStateToProps = (state) => {
    return {
        user: state.UserReducer.user,
        productsType: state.ProductTypeReducer.productsType,
        products: state.ProductReducer.products
    }
};

const mapDispatchToProps = (dispatch) => {
  return {
      getAllProductsType : () => dispatch(getAllProductType()),
      getProductsByProductType: (idProductType) => dispatch(getProductsByProductType(idProductType)),
      addProd: (products, product) => dispatch(addProduct(products, product)),
      deleteProd: (products, idProduct) => dispatch(deleteProduct(products, idProduct)),
      updateProd: (products, product) => dispatch(updateProduct(products, product))
  }
};

export default connect(mapStateToProps, mapDispatchToProps) (GestionProduit);