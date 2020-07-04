import React from "react";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemText from "@material-ui/core/ListItemText";
import {getAllCriteres} from "../action/CritereAction";
import {connect} from "react-redux";

const SelectMultipleCriteria = ({row, criteres, getAllCriteres, isMultiple}) => {
    const [critereName, setCritereName] = React.useState((row.rowData.criteriaList !==undefined) ? row.rowData.criteriaList.map(c => c.name): []);
    if(criteres === null) getAllCriteres();

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };
    criteres.sort((a, b) => (a.name > b.name) ? 1 : -1);

    const handleChange = event => {
        row.onChange(event.target.value);
        setCritereName(event.target.value);
    };

    return (criteres !== null) ? <FormControl style={{width: '180px'}}>
        <InputLabel id="demo-mutiple-checkbox-label">Criteres</InputLabel>
        <Select
            labelId="demo-mutiple-checkbox-label"
            id="demo-mutiple-checkbox"
            multiple={isMultiple}
            value={critereName}
            autoWidth={true}
            onChange={handleChange}
            input={<Input />}
            renderValue={selected => selected.join(', ')}
            MenuProps={MenuProps}
        >
            {criteres.map(critere => (
                <MenuItem key={critere.idCriteria} value={critere.name}>
                    <Checkbox checked={critereName.indexOf(critere.name) > -1} />
                    <ListItemText primary={critere.name} />
                </MenuItem>
            ))}
        </Select>
    </FormControl> : <div>Chargement...</div>
};

const mapStateToProps = state => {
    return {
        criteres: state.CritereReducer.criteres
    }
};

const mapDispatchToProps = dispatch => {
    return {
        getAllCriteres: () => dispatch(getAllCriteres())
    }
};

export default connect (mapStateToProps,mapDispatchToProps) (SelectMultipleCriteria);