import React from 'react';
import ProductCard from "./ProductCard";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles({
    list: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        alignContent: 'space-around'
    }
});

const ListProducts = ({products}) => {
    const classes = useStyles();
    return <div className={classes.list}>{products.content.map(product => <ProductCard product={product} key={product.idProduct}/>)}</div>
};

export default ListProducts;