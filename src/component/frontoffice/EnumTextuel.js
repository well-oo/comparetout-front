import React, {useState} from "react";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import {connect} from "react-redux";
import {getDistinctValueEnumStringFromCriteria} from "../../action/ValueCriteriaProductAction";
import {Collapse} from "react-collapse";
import Divider from '@material-ui/core/Divider';
import Expandless from "@material-ui/icons/ExpandLess";
import Expandmore from "@material-ui/icons/ExpandMore";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import {getSearchProducts} from "../../action/ProductAction";
import {useParams} from "react-router-dom";

const EnumTextuel = ({critere, values, getDistinctValues, search, getSearchProductList, loading, name}) => {
    const [state, setState] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    let { idProductType } = useParams();

    if(search === null && state !== '' && !loading){
        setState('');
        setIsOpen(false);
    }


    const handleOnChange = (e) => {
        let newSearch;
        if(e.target.value === state){
           newSearch = {
                ...delete search[critere.idCriteria]
            };
            setState("");
        }
        else{
            newSearch = {
                ...search,
                [""+critere.idCriteria]: e.target.value
            };
            setState(e.target.value);
        }

        let strSearch = Object.entries(newSearch).map(tab => `${tab[0]}-${tab[1]}`).join();
        getSearchProductList(newSearch, `${strSearch}&name=${name}`, idProductType, 0);
    };

    const handleOnClick = (e) => {
        setIsOpen(!isOpen);
        if(!isOpen) getDistinctValues(critere.idCriteria);
    };
    let contentCollapse = values !== null && (Object.keys(values).find(value => parseInt(value) === critere.idCriteria))? <MenuItem key={critere.idCriteria} >
            <FormControl style={{minWidth: 270}}>
                <Select value={state} onChange={handleOnChange} displayEmpty>
                    {values[critere.idCriteria.toString()].map((value,i) => <MenuItem key={i} value={value}>{value}</MenuItem>)}
                </Select>
            </FormControl>
        </MenuItem>: <div>Chargement...</div>;
    return <div>
        <ListItem button key={critere.name} onClick={handleOnClick}>
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
        values: state.ValueCriteriaProductReducer.values,
        search: state.ProductReducer.search,
        loading: state.ProductReducer.loading
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getDistinctValues: (idCriteria) => dispatch(getDistinctValueEnumStringFromCriteria(idCriteria)),
        getSearchProductList: (newSearch, strSearch, idProductType, pageable) => dispatch(getSearchProducts(newSearch, strSearch, idProductType, pageable))
    }
};

export default connect(mapStateToProps, mapDispatchToProps) (EnumTextuel);
