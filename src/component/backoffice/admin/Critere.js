import React from "react";
import MaterialTable from "material-table";
import {getAllCriteres, deleteCritere, addCritere, updateCritere} from "../../../action/CritereAction";
import {getAllComparisonMethod} from "../../../action/ComparisonMethodAction";
import {connect} from "react-redux";
import SelectComparisonMethod from "../../../helper/SelectComparisonMethod";

const Critere = ({getAllCriteres, criteres, deleteCritere, comparisonMethods, getAllComparisonMethod, updateCritere, addCritere}) => {
    let columns =  [
        {title: 'Nom', field: 'name'},
        {title: 'Mesure', field: 'mesure'},
        {title: 'Dynamique', field: 'isCriteriaListDynamical', type: 'boolean'},
        {title: 'Obligatoire', field: 'estObligatoire', type: 'boolean'}
    ];


    if(criteres == null) getAllCriteres();
    if(comparisonMethods == null) {
        getAllComparisonMethod();
    }else {
        columns = [
            ...columns,
            {
                title: 'Méthode de comparaison',
                field: 'comparisonMethod',
                editComponent : (props) => (<SelectComparisonMethod
                                             title={"Comparison method"}
                                             onChange={props.onRowDataChange}
                                             element={{
                                                 value: props.rowData.idComparisonMethod,
                                                 display: props.value
                                             }}
                                             rowData={props.rowData}
                                             values={comparisonMethods}
                                             isMultiple={false}/>)
            },
        ]
    }

    let rows = [];
    if(rows.length === 0 && criteres !== null){
        rows = criteres.map(elem => {
            return {
                id: elem.idCriteria,
                name: elem.name,
                mesure: elem.mesure,
                isCriteriaListDynamical: elem.isCriteriaListDynamical,
                estObligatoire: elem.estObligatoire,
                comparisonMethod: `${elem.comparisonMethod.comparisonType.name} ${elem.comparisonMethod.dataType.name}`,
                idComparisonMethod: elem.comparisonMethod.idComparisonMethod
            }
        });
    }

    const buildCriteriaWithNewData = newData => {
        let comparisonMethod = comparisonMethods.find(e => e.idComparisonMethod === newData.idComparisonMethod);
        return {idCriteria: newData.id, name: newData.name, mesure: newData.mesure, isCriteriaListDynamical: newData.isCriteriaListDynamical, estObligatoire: newData.estObligatoire, comparisonMethod: comparisonMethod};
    };

    return(
        <MaterialTable
            title="Criteres"
            columns={columns}
            data={rows}
            editable={{
                onRowAdd : newData => new Promise(resolve => {
                    let critere = buildCriteriaWithNewData(newData);
                    addCritere(criteres, critere);
                    resolve();
                }),
                onRowUpdate: (newData, oldData) => new Promise(resolve => {
                      let critere = buildCriteriaWithNewData(newData);
                      updateCritere(criteres, critere);
                      resolve();
                }),
                onRowDelete: oldData =>
                new Promise(resolve => {
                    deleteCritere(criteres, oldData.id);
                    resolve();
                })
            }}
        />
    )
};

const mapStateToProps = (state) => {
    return {
        criteres: state.CritereReducer.criteres,
        comparisonMethods: state.ComparisonMethodReducer.comparisonMethods
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getAllCriteres: () => dispatch(getAllCriteres()),
        deleteCritere: (criteres, id) => dispatch(deleteCritere(criteres, id)),
        getAllComparisonMethod: () => dispatch(getAllComparisonMethod()),
        addCritere: (criteres, critere) => dispatch(addCritere(criteres, critere)),
        updateCritere: (criteres, critere) => dispatch(updateCritere(criteres, critere))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Critere);