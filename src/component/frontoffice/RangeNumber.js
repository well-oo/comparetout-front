import React, {useRef, useState} from "react";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import {Collapse} from "react-collapse";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import Expandless from "@material-ui/icons/ExpandLess";
import Expandmore from "@material-ui/icons/ExpandMore";
import {connect} from "react-redux";
import {getSearchProducts} from "../../action/ProductAction";
import {useParams} from "react-router-dom";
import _ from "lodash";

const RangerNumber = ({critere, name, search, getSearchProductList, loading}) => {
    const [state, setState] = useState({
        min: "",
        max: ""
    });
    const [isOpen, setIsOpen] = useState(false);
    let { idProductType } = useParams();

    const delayedQuery = useRef(_.debounce((newSearch = {}, value="osef") => {
        let strSearch = Object.entries(newSearch).map(tab => `${tab[0]}-${tab[1]}`).join();
        console.log(strSearch);
        getSearchProductList(newSearch, `${strSearch}&name=${name}`, idProductType, 0);
    }, 500)).current;

    const handleChangeMin = (e) => {
        setState({...state, min: e.target.value});
        name = (name === undefined || name === null) ? "": name;
        let newSearch;
        if(e.target.value !== "" && state.max !== ""){
            newSearch = {
                ...search,
                [""+critere.idCriteria]: `${e.target.value}/${state.max}`
            };
        }
        else{
            if(search !== null){
                newSearch = {
                    ...delete search[critere.idCriteria]
                };
            }
        }
        delayedQuery(newSearch);
    };

    const handleChangeMax = (e) => {
        setState({...state, max: e.target.value});
        name = (name === undefined || name === null) ? "": name;
        let newSearch;
        if(e.target.value !== "" && state.min !== ""){
            newSearch = {
                ...search,
                [""+critere.idCriteria]: `${state.min}/${e.target.value}`
            };
        }
        else {
            if(search !== null){
                newSearch = {
                    ...delete search[critere.idCriteria]
                };
            }
        }
        delayedQuery(newSearch);
    };


    let contentCollapse =  <div key={critere.idCriteria} style={{display: "flex", flexDirection: "column", justifyContent:"spaceAround"}}>
        <TextField
            label="Min"
            type="number"
            name="min"
            value={state.min}
            onChange={handleChangeMin}
        />
        <TextField
            label="Max"
            type="number"
            name="max"
            value={state.max}
            onChange={handleChangeMax}
        />
    </div>;

    return <div>
        <ListItem button key={critere.name} onClick={() => setIsOpen(!isOpen)}>
            <ListItemIcon>{isOpen ? <Expandless/> : <Expandmore/>}</ListItemIcon>
            <ListItemText primary={critere.name}/><br/>
        </ListItem>
        <Collapse isOpened = { isOpen }>
            {contentCollapse}
        </Collapse>
        <Divider />
    </div>
};

const mapStateToProps = (state) => {
    return {
        search: state.ProductReducer.search,
        loading: state.ProductReducer.loading
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getSearchProductList: (newSearch, strSearch, idProductType, pageable) => dispatch(getSearchProducts(newSearch, strSearch, idProductType, pageable))
    }
};

export default connect(mapStateToProps, mapDispatchToProps) (RangerNumber);