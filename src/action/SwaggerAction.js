import axios from "axios";

export const swaggerConstant = {
    SWAGGER_REQUEST_STARTED : "SWAGGER_REQUEST_STARTED",
    SWAGGER_REQUEST_SUCCESS : "SWAGGER_REQUEST_SUCCESS",
    SWAGGER_REQUEST_FAILURE : "SWAGGER_REQUEST_FAILURE",
};

export const getSwaggerDocs = () =>{
    return (dispatch, getState) => {
        dispatch(swaggerRequestStarted());
        const token = localStorage.getItem("token").replace(/['"]+/g, '');
        axios.get(`http://${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/v2/api-docs`,{ headers: {"Authorization" : `Bearer ${token}`} })
             .then( docs => {
                 dispatch(swaggerRequestSuccess({...docs.data}));
                 }
             )
            .catch(
                error => dispatch(swaggerRequestFailure(error.message))
            )
    }

};

const swaggerRequestStarted = () => {
    return {
        type: swaggerConstant.SWAGGER_REQUEST_STARTED
    }
};

const swaggerRequestSuccess = docs => {
    return {
        type: swaggerConstant.SWAGGER_REQUEST_SUCCESS,
        payload: {
            docs
        }
    }
};

const swaggerRequestFailure = (error) => {
    return {
        type: swaggerConstant.SWAGGER_REQUEST_FAILURE,
        payload: {
            error
        }
    }
};