import React from 'react';
import {useHistory, useParams} from "react-router-dom";
import {getProductByID} from '../../action/ProductAction';
import {connect} from "react-redux";
import moment from "moment";

const getCriteriaByName = (product, name) => { return product.valueCriteriaProductList.find(valueCriteria => valueCriteria.criteria.name === name).value; };

const Product = ({getProduct, product}) => {
    let { idProduct } = useParams();
    const history = useHistory();

    if(!product || parseInt(idProduct) !== product.idProduct) {
        getProduct(idProduct);
    }

    return (!product) ? <div>Chargement...</div> :
    <div className="container">
        <div><img src={product.picture} className="picture" alt={product.name}/></div>
        <div>
            <h2 className="link" onClick={() => history.push(`../${product.productType.idProductType}`)}>
                <i className="material-icons">turned_in</i>
                    {product.productType.titleWebPage}
            </h2>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>Mis en ligne le {moment(product.addProduct).format('DD-MM-YYYY')}, contactez <a href={`mailto:${product.user.email}`}>{product.user.email}</a> pour plus d'informations!</p>
            <p className="prix">{getCriteriaByName(product, 'Prix')}</p>
            <h3>Informations générales:</h3>
            <ul className="liste">
            {product.valueCriteriaProductList.filter(valueCriteria => valueCriteria.criteria.name !== 'Prix').map(elem => {
                return <li key={elem.idValueCriteriaProduct}><span className="span">{elem.criteria.name}:</span> {elem.value}</li>
            })}
            </ul>
        </div>
    </div>
};


const mapStateToProps = state => {
    return {
        product: state.ProductReducer.product
    }
};

const mapDispatchToProps = dispatch => {
    return {
        getProduct : idProduct => dispatch(getProductByID(idProduct))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Product);