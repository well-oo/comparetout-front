import axios from "axios";
axios.defaults.baseURL = `http://${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/`;

export const valueCriteriaProductConst = {
    REQUEST_ON_VALUE_CRITERIA_PRODUCT_STARTED: "REQUEST_ON_VALUE_CRITERIA_PRODUCT_STARTED",
    REQUEST_ON_VALUE_CRITERIA_PRODUCT_SUCCESS: "REQUEST_ON_VALUE_CRITERIA_PRODUCT_SUCCESS",
    REQUEST_ON_VALUE_CRITERIA_PRODUCT_FAILURE: "REQUEST_ON_VALUE_CRITERIA_PRODUCT_FAILURE",
    RESET_ENUM_LIST_TEXTUEL: "RESET_ENUM_LIST_TEXTUEL"
};

const requestOnValueCriteriaProductStarted = () => {
    return {
        type: valueCriteriaProductConst.REQUEST_ON_VALUE_CRITERIA_PRODUCT_STARTED
    }
};

const requestOnValueCriteriaProductSuccess= (values, idCriteria) => {
    return {
        type: valueCriteriaProductConst.REQUEST_ON_VALUE_CRITERIA_PRODUCT_SUCCESS,
        payload: {
            values,
            idCriteria
        }
    }
};

const requestOnValueCriteriaProductFailure = (error) => {
    return {
        type: valueCriteriaProductConst.REQUEST_ON_VALUE_CRITERIA_PRODUCT_FAILURE,
        payload: {
            error
        }
    }
};

export const getDistinctValueEnumStringFromCriteria = (idCriteria) => {
    return (dispatch, getState) => {
        dispatch(requestOnValueCriteriaProductStarted());
        axios.get(`api/valueCriteriaProduct/${idCriteria}`)
            .then(res => dispatch(requestOnValueCriteriaProductSuccess(res.data, idCriteria)))
            .catch(err => dispatch(requestOnValueCriteriaProductFailure(err.message)));
    }
};

export const resetEnumList = () => {
    return {
        type: valueCriteriaProductConst.RESET_ENUM_LIST_TEXTUEL
    }
};