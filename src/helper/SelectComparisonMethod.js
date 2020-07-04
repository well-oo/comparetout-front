import React, {useEffect, useState, useRef} from "react";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemText from "@material-ui/core/ListItemText";

const SelectComparisonMethod= ({element, onChange, values, isMultiple, title, rowData}) => {
    const [state, setState] = useState({
        value: (element.value === undefined) ? values[0].idComparisonMethod : element.value,
        display: (element.display === undefined) ? `${values[0].comparisonType.name} ${values[0].dataType.name}` : element.display
    });

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
    const latestOnChange = useRef(onChange);
    const data = useRef(rowData);

    useEffect(() => {
        latestOnChange.current = onChange;
    }, [onChange]);


    useEffect(() => {
        data.current = rowData;
    }, [rowData]);

    useEffect(() => {
        latestOnChange.current({...data.current, comparisonMethod: state.display, idComparisonMethod: state.value});
    }, [state]);

    const handleChange = event => {
        setState(prevState =>
            ({...prevState,
                display: event._targetInst.stateNode.innerText || event._targetInst.stateNode.parentNode.parentNode.parentNode.innerText,
                value: event.target.value}));
    };


    return (values !== null) ? <FormControl style={{width: '180px'}}>
        <InputLabel  id="demo-mutiple-checkbox-label">{title}</InputLabel>
        <Select
            labelId="demo-mutiple-checkbox-label"
            id="demo-mutiple-checkbox"
            multiple={isMultiple}
            value={state.value}
            autoWidth={true}
            onChange={handleChange}
            input={<Input />}
            renderValue={() => state.display}
            MenuProps={MenuProps}
        >
            {
                values.map(value => (
                    <MenuItem key={value.idComparisonMethod} value={value.idComparisonMethod}>
                        <Checkbox checked={value.idComparisonMethod === state.value } />
                        <ListItemText primary={`${value.comparisonType.name} ${value.dataType.name}`} />
                    </MenuItem>
                ))
            }
        </Select>
    </FormControl> : <div>Chargement...</div>
};

export default SelectComparisonMethod;