import React,{ useEffect, useRef } from 'react';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import {fade, makeStyles, useTheme} from '@material-ui/core/styles';
import { useParams} from "react-router-dom";
import {connect} from "react-redux";
import {getAllProductType} from "../../action/ProductTypeAction";
import {getProductsByProductTypePageable, getSearchProducts, resetToInitialState} from "../../action/ProductAction";
import ListProducts from "./ListProducts";
import ReactPaginate from 'react-paginate';
import EnumTextuel from "./EnumTextuel";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from '@material-ui/icons/Search';
import DeleteIcon from '@material-ui/icons/Delete';
import _ from 'lodash';
import RangerNumber from "./RangeNumber";


const drawerWidth = 300;

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
        top: '64px'
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: 'auto',
        },
    },
    delete: {
        position: 'relative',
        cursor: 'pointer',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: 'auto',
        },
    },
    searchIcon: {
        width: theme.spacing(7),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 7),
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: 200,
        },
    },
}));

const HomeProducts = ({productsType, getAllProductsType, products, getProductsByProductTypePageable, search, getSearchProductList, reset}) => {
    let { idProductType } = useParams();
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [searchInput, setSearchInput] = React.useState('');

    let productType;
    if(productsType === null)
        getAllProductsType();
    else{
        productType = productsType.filter(ptype => ptype.idProductType === parseInt(idProductType))[0];
        productType.criteriaList.sort((a, b) => (a.name > b.name) ? 1 : -1);
    }

    useEffect(()=>{
        getProductsByProductTypePageable(idProductType, 0);
    }, [getProductsByProductTypePageable, idProductType]);


    const handleChangePagination = data => {
        if(search !==null){
            let strSearch = Object.entries(search).map(tab => `${tab[0]}-${tab[1]}`).join();
            getSearchProductList(search, strSearch, productType.idProductType, data.selected);
        }
        else{
            getProductsByProductTypePageable(idProductType, data.selected);
        }
    };


    const delayedQuery = useRef(_.debounce((search, term) => {
        if(search !== null){
            let strSearch = Object.entries(search).map(tab => `${tab[0]}-${tab[1]}`).join();
            getSearchProductList(search, `${strSearch}&name=${term}`, idProductType, 0);
        } else {
            getSearchProductList(search, `''&name=${term}`, idProductType, 0);
        }
    }, 500)).current;

    const handleChangeSearch = e => {
        setSearchInput(e.target.value);
        delayedQuery(search, e.target.value);
    };

    const classes = useStyles();
    const theme = useTheme();

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    let drawer = <div>Chargement...</div>
    if(productsType !== null){
        drawer = (
            <List>
                <div className={classes.delete} onClick={() => {
                    reset();
                    setSearchInput('');
                    getProductsByProductTypePageable(idProductType, 0);
                }}>
                    <div className={classes.searchIcon}>
                        <DeleteIcon/>
                    </div>
                    <div className={classes.inputInput}>
                        <span>Reset</span>
                    </div>
                </div>
                <div className={classes.search}>
                    <div className={classes.searchIcon}>
                        <SearchIcon />
                    </div>
                    <InputBase
                        placeholder="Search…"
                        onChange={handleChangeSearch}
                        value={searchInput}
                        classes={{
                            root: classes.inputRoot,
                            input: classes.inputInput,
                        }}
                        inputProps={{ 'aria-label': 'search' }}
                    />
                </div>
                {
                    productType.criteriaList.map((critere) => (
                        (critere.comparisonMethod.comparisonType.name === "Enum" && critere.comparisonMethod.dataType.name === "Textuel") ?
                            <EnumTextuel key={critere.idCriteria} critere={critere} name={searchInput}/> :
                            <RangerNumber key={critere.idCriteria} critere={critere} name={searchInput}/>
                    ))
                }
            </List>
        );
    }


    return (productType === null ||productType === undefined || products === null) ? <div>Chargement...</div> :
        <div className={classes.root}>
            <nav className={classes.drawer} aria-label="mailbox folders">
                <Hidden smUp implementation="css">
                    <Drawer
                        variant="temporary"
                        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                            keepMounted: true,
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
                <Hidden xsDown implementation="css">
                    <Drawer
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        variant="permanent"
                        open
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
            </nav>
            <main className={classes.content}>
                <Typography variant="h6" gutterBottom>
                    {productType.name}
                </Typography>
                <div className={classes.content}>
                    {(products.totalElements > 0) ?
                        <React.Fragment>
                            <ListProducts products={products}/>
                            <div className = "div-pagination">
                                < ReactPaginate
                            previousLabel={'«'}
                            nextLabel={'»'}
                            breakLabel={'...'}
                            breakClassName={'break-me'}
                            pageCount={products.totalPages}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={5}
                            onPageChange={handleChangePagination}
                            containerClassName={'pagination'}
                            subContainerClassName={'pages pagination'}
                            activeClassName={'active'}
                            />
                            </div>
                        </React.Fragment>
                        :
                        <h3>Aucun produit, veuillez modifier votre recherche <span role="img" aria-label=":)">😃</span></h3>
                    }
                </div>
            </main>
        </div>
};


const mapStateToProps = state => {
    return {
        productsType: state.ProductTypeReducer.productsType,
        products: state.ProductReducer.products,
        search: state.ProductReducer.search
    }
};

const mapDispatchToProps = dispatch => {
    return {
        getAllProductsType : () => dispatch(getAllProductType()),
        getProductsByProductTypePageable: (idProductType, pageable) =>  dispatch(getProductsByProductTypePageable(idProductType, pageable)),
        getSearchProductList: (newSearch, strSearch, idProductType, pageable) => dispatch(getSearchProducts(newSearch, strSearch, idProductType, pageable)),
        reset : () => dispatch(resetToInitialState())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeProducts);