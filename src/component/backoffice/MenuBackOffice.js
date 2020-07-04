import React from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import {BackOfficeConstants, changedMenu} from "../../action/BackOfficeAction";
import {connect} from "react-redux";
import {userConstants} from "../../action/UserAction";

const MenuBackOffice = ({changedMenu, user, valueMenu}) => {
    const [value, setValue] = React.useState("");

    if(valueMenu != null && value === "") setValue(valueMenu);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        changedMenu(newValue);
    };

    return  user == null || valueMenu == null ? <div>Chargement...</div> :
        <div>
        {user.roles[0] === userConstants.role.ADMIN ? (
            <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                indicatorColor="primary"
            >
                <Tab label="Gestion fournisseurs" value={BackOfficeConstants.GESTION_FOUR}/>
                <Tab label="Gestion produits" value={BackOfficeConstants.GESTION_PRODUIT}/>
                <Tab label="Gestion type de produits" value={BackOfficeConstants.GESTION_TYPE_PRODUIT}/>
                <Tab label="Gestion mesures" value={BackOfficeConstants.GESTION_MESURES}/>
                <Tab label="Gestion critères" value={BackOfficeConstants.CRITERE}/>
                <Tab label="Visuel mails" value={BackOfficeConstants.MAIL}/>
                <Tab label="Visuel méthodes de comparaisons" value={BackOfficeConstants.COMPARAISON}/>
                <Tab label="Abonnements" value={BackOfficeConstants.ABONNEMENT}/>
                <Tab label="Statistiques" value={BackOfficeConstants.STATS}/>
            </Tabs>
        ) : (
            <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                indicatorColor="primary"
            >
                <Tab label="Mes informations" value={BackOfficeConstants.INFORMATIONS}/>
                <Tab label="Mon accès API" value={BackOfficeConstants.ACCES_API}/>
                <Tab label="Mes produits" value={BackOfficeConstants.PRODUITS}/>
            </Tabs>
        )
        }

    </div>
};

const mapStateToProps = (state) => {
    return {
        user: state.UserReducer.user,
        valueMenu: state.BackOfficeReducer.valueMenu,
    }
};

const mapDispatchToProps = (dispatch) => {
  return {
      changedMenu : (menu) => dispatch(changedMenu(menu))
  }
};

export default connect(mapStateToProps, mapDispatchToProps) (MenuBackOffice);