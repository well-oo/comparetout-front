import React from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {useHistory} from "react-router-dom";

const useStyles = makeStyles({
    card: {
        maxWidth: 345,
        margin: '1em 0 0 0'
    },
    image: {
        height: '200px',
        width: '200px'
    }
});


const ProductCard = ({product}) => {
    let productName = product.name;
    let productPrice = `${product.valueCriteriaProductList.find(valueCriteria => valueCriteria.criteria.name === 'Prix (€)').value}`;

    const classes = useStyles();
    const history = useHistory();

    return (
        <Card className={classes.card} onClick={() => history.push(`${history.location.pathname}/${product.idProduct}`)}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    className={classes.image}
                    alt={productName}
                    image={product.picture}
                    title={productName}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {productName}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {product.description}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary">
                    {productPrice}
                </Button>
                <Button size="small" color="primary">
                    Learn More
                </Button>
            </CardActions>
        </Card>
    );

};

export default ProductCard;