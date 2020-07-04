import axios from "axios";
axios.defaults.baseURL = `http://${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/`;

export const ComparisonMethodConst = {
    REQUEST_ON_COMPARISONMETHOD_STARTED: "REQUEST_ON_COMPARISONMETHOD_STARTED",
    REQUEST_ON_COMPARISONMETHOD_FAILURE: "REQUEST_ON_COMPARISONMETHOD_FAILURE",
    REQUEST_ON_COMPARISONMETHOD_SUCCESS: "REQUEST_ON_COMPARISONMETHOD_SUCCESS"
};


const requestOnComparisonMethodStarted = () => {
    return {
        type: ComparisonMethodConst.REQUEST_ON_COMPARISONMETHOD_STARTED
    }
};

const requestOnComparisonMethodSuccess= comparisonMethods => {
    return {
        type: ComparisonMethodConst.REQUEST_ON_COMPARISONMETHOD_SUCCESS,
        payload: {
            comparisonMethods
        }
    }
};

const requestOnComparisonMethodFailure = (error) => {
    return {
        type: ComparisonMethodConst.REQUEST_ON_COMPARISONMETHOD_FAILURE,
        payload: {
            error
        }
    }
};

export const getAllComparisonMethod = () => {
    return (dispatch, getState) => {
        dispatch(requestOnComparisonMethodStarted());
        axios.get("api/comparisonMethods/")
            .then(res =>{
                dispatch(requestOnComparisonMethodSuccess(res.data))
            })
            .catch(err => dispatch(requestOnComparisonMethodFailure(err.message)));
    }
};