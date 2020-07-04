import React from 'react';
import {Paper} from "@material-ui/core";
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
import EnumTextuel from "./EnumTextuel";

const MenuCriteres = ({criteres}) => {
    return <Paper>
        <MenuList style={{overflowY:"auto", height:"100%", position:"fixed"}}>
            {
                criteres.map((c,i) => {
                    if(c.comparisonMethod.comparisonType.name === "Enum" && c.comparisonMethod.dataType.name === "Textuel")
                        return <EnumTextuel critere={c} key={i}/>

                    return <MenuItem key={c.idCriteria}>{c.name}</MenuItem>
                })
            }
        </MenuList>
    </Paper>
};

export default MenuCriteres;