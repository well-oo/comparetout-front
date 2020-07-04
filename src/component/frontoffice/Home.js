import React from 'react';
import Grid from "@material-ui/core/Grid";
import {connect} from "react-redux";
import {getAllProductType} from "../../action/ProductTypeAction";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import {useHistory} from "react-router-dom";
import {Container} from "@material-ui/core";
import {resetEnumList} from "../../action/ValueCriteriaProductAction";
import {resetProductList} from "../../action/ProductAction";


const Home = ({productsType, getAllProductsType, resetEnumListTextuel, resetProducts}) => {

    if(productsType === null) getAllProductsType();
    const history = useHistory();

    const handleOnClick = (idProductType) => {
        resetEnumListTextuel();
        resetProducts();
        history.push(`/products/${idProductType}`);
    };

    return (
        <Container maxWidth="lg" style={{diplay:"flex"}}>
          <Grid container  spacing={3}>
              <Typography variant="h2" gutterBottom style={{marginTop:15}}>
                  Quel type de produit voulez vous comparer ?
              </Typography>
              {productsType === null ? <div>Chargement ...</div> :
                  productsType.map((item, index) => (
                          <Card key={index} style={{width:345, margin: 30}} onClick={() => handleOnClick(item.idProductType)}>
                              <CardActionArea>
                                  <CardMedia
                                      style={{height:400}}
                                      image={item.headerImage}
                                      title={item.name}
                                  />
                                  <CardContent>
                                      <Typography gutterBottom variant="h5" component="h2">
                                          {item.name}
                                      </Typography>
                                  </CardContent>
                              </CardActionArea>
                          </Card>
                      ))
              }
          </Grid>
        </Container>
    );
};

const mapStateToProps = state => {
    return {
        productsType: state.ProductTypeReducer.productsType
    }
};

const mapDispatchToProps = dispatch => {
    return {
        getAllProductsType : () => dispatch(getAllProductType()),
        resetEnumListTextuel: () => dispatch(resetEnumList()),
        resetProducts: () => dispatch(resetProductList())
    }
};

export default connect(mapStateToProps, mapDispatchToProps) (Home);