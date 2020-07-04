import axios from "axios";
axios.defaults.baseURL = `http://${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/`;

export const CritereConst = {
    REQUEST_ON_CRITERE_STARTED: "REQUEST_ON_CRITERE_STARTED",
    REQUEST_ON_CRITERE_FAILURE: "REQUEST_ON_CRITERE_FAILURE",
    REQUEST_ON_CRITERE_SUCCESS: "REQUEST_ON_CRITERE_SUCCESS"
};


const requestOnCritereStarted = () => {
    return {
        type: CritereConst.REQUEST_ON_CRITERE_STARTED
    }
};

const requestOnCritereSuccess= (criteres) => {
    return {
        type: CritereConst.REQUEST_ON_CRITERE_SUCCESS,
        payload: {
            criteres
        }
    }
};

const requestOnCritereFailure = (error) => {
    return {
        type: CritereConst.REQUEST_ON_CRITERE_FAILURE,
        payload: {
            error
        }
    }
};

export const getAllCriteres = () => {
    return (dispatch, getState) => {
        dispatch(requestOnCritereStarted());
        axios.get("api/criteria/")
            .then(res =>{
                dispatch(requestOnCritereSuccess(res.data))
            })
            .catch(err => dispatch(requestOnCritereFailure(err.message)));
    }
};

export const addCritere = (criteres, criteria) => {
    criteria = {...criteria,
                isCriteriaListDynamical: (criteria.isCriteriaListDynamical === undefined) ? false : criteria.isCriteriaListDynamical,
                estObligatoire: (criteria.estObligatoire === undefined) ? false : criteria.estObligatoire,
                mesure: (criteria.mesure === undefined) ? "" : criteria.mesure
                };
    return (dispatch, getState) => {
        dispatch(requestOnCritereStarted());
        const token = localStorage.getItem("token").replace(/['"]+/g, '');
        axios.post(`api/criteria/`, criteria, {headers: {"Authorization": `Bearer ${token}`}})
            .then(res => {
                dispatch(requestOnCritereSuccess([...criteres, res.data]))
            })
            .catch(err => dispatch(requestOnCritereFailure(err.message)));
    }
};

export const deleteCritere = (criteres, id) => {
    return (dispatch, getState) => {
        dispatch(requestOnCritereStarted());
        const token = localStorage.getItem("token").replace(/['"]+/g, '');
        axios.delete(`api/criteria/${id}`, {headers: {"Authorization": `Bearer ${token}`}})
            .then(res => {
                dispatch(requestOnCritereSuccess([...criteres.slice(0, criteres.findIndex(elem => elem.idCriteria === id)), ...criteres.slice(criteres.findIndex(elem => elem.idCriteria === id)+1)]))
            })
            .catch(err => dispatch(requestOnCritereFailure(err.message)));
    }
};

export const updateCritere= (criteres, criteria) => {
    criteres = criteres.map(c => (c.idCriteria === criteria.idCriteria) ? criteria : c);
    return (dispatch, getState) => {
        dispatch(requestOnCritereStarted());
        const token = localStorage.getItem("token").replace(/['"]+/g, '');
        axios.put(`api/criteria/${criteria.idCriteria}`, criteria, {headers: {"Authorization": `Bearer ${token}`}})
            .then(res => {
                dispatch(requestOnCritereSuccess(criteres))
            })
            .catch(err => dispatch(requestOnCritereFailure(err.message)));
    }
};