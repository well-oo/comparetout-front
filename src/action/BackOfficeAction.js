export const BackOfficeConstants = {
    GESTION_FOUR : "GESTION_FOUR",
    GESTION_PRODUIT : "GESTION_PRODUIT",
    GESTION_TYPE_PRODUIT : "GESTION_TYPE_PRODUIT",
    GESTION_MESURES : "GESTION_MESURES",
    MAIL : "MAIL",
    CRITERE : "CRITERE",
    COMPARAISON : "COMPARAISON",
    ABONNEMENT : "ABONNEMENT",
    STATS : "STATS",
    CHANGED_MENU: "CHANGED_MENU",
    INFORMATIONS: "INFORMATIONS",
    ACCES_API: "ACCES_API",
    PRODUITS: "PRODUITS",
    EMPTY: "EMPTY"
};

export const changedMenu = (menu) =>{
    return {
        type: BackOfficeConstants.CHANGED_MENU,
        menu
    }
};

export const emptyMenu = () => {
    return {
        type: BackOfficeConstants.EMPTY
    }
};