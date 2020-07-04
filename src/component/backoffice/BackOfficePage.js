import React from 'react';
import Grid from "@material-ui/core/Grid";
import {Container, Typography} from "@material-ui/core";
import MenuBackOffice from "./MenuBackOffice";
import {BackOfficeConstants, changedMenu} from "../../action/BackOfficeAction";
import GestionFournisseur from "./admin/GestionFournisseur";
import Statistiques from "./admin/Statistiques";
import Abonnement from "./admin/Abonnement";
import Comparaison from "./admin/Comparaison";
import GestionMesure from "./admin/GestionMesure";
import GestionProduit from "./admin/GestionProduit";
import Mail from "./admin/Mail";
import GestionTypeProduit from "./admin/GestionTypeProduit";
import {connect} from "react-redux";
import {me, userConstants} from "../../action/UserAction";
import Informations from "./supplier/Informations";
import AccesAPI from "./supplier/AccesAPI";
import Produits from "./supplier/Produits";
import Critere from "./admin/Critere";

const BackOfficePage = ({valueMenu, user, me, changedMenu}) => {
    if(user==null) me();
    let component;

    if(user!=null){
        if(user.roles[0] === userConstants.role.ADMIN && valueMenu== null) changedMenu(BackOfficeConstants.GESTION_FOUR);
        else if(user.roles[0] === userConstants.role.SUPPLIER && valueMenu== null) changedMenu(BackOfficeConstants.INFORMATIONS);

        if(user.roles[0] === userConstants.role.ADMIN)
            switch (valueMenu) {
                case (BackOfficeConstants.GESTION_FOUR):
                    component = <GestionFournisseur/>;
                    break;
                case (BackOfficeConstants.STATS):
                    component = <Statistiques/>;
                    break;
                case (BackOfficeConstants.ABONNEMENT):
                    component = <Abonnement/>;
                    break;
                case (BackOfficeConstants.COMPARAISON):
                    component = <Comparaison/>;
                    break;
                case (BackOfficeConstants.GESTION_MESURES):
                    component = <GestionMesure/>;
                    break;
                case (BackOfficeConstants.CRITERE):
                    component = <Critere/>;
                    break;
                case (BackOfficeConstants.GESTION_PRODUIT):
                    component = <GestionProduit/>;
                    break;
                case (BackOfficeConstants.MAIL):
                    component = <Mail/>;
                    break;
                case (BackOfficeConstants.GESTION_TYPE_PRODUIT):
                    component = <GestionTypeProduit/>;
                    break;
                default:
                    component = <GestionFournisseur/>;
            }
        else
            switch (valueMenu){
                case(BackOfficeConstants.INFORMATIONS):
                    component = <Informations/>;
                    break;
                case(BackOfficeConstants.ACCES_API):
                    component = <AccesAPI/>;
                    break;
                case(BackOfficeConstants.PRODUITS):
                    component = <Produits/>;
                    break;
                default:
                    component = <Informations/>;
            }
    }
    return(
        <Container maxWidth="lg">
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Typography variant="h6" gutterBottom>
                        Backoffice comparetout
                    </Typography>
                </Grid>
                <Grid item md={2}><MenuBackOffice/></Grid>
                <Grid item md={10}>
                    {component}
                </Grid>
            </Grid>
        </Container>
    );
};

const mapStateToProps = (state) => {
  return {
      valueMenu: state.BackOfficeReducer.valueMenu,
      user: state.UserReducer.user
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
      me : () => dispatch(me()),
      changedMenu : (menu) => dispatch(changedMenu(menu))
  }
};

export default connect(mapStateToProps, mapDispatchToProps) (BackOfficePage);