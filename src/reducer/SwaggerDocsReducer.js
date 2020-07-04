import {swaggerConstant} from "../action/SwaggerAction";

const initialState = {
    docs : null,
    loading: false,
    error: null
};

const SwaggerDocsReducer = (state = initialState, action) => {
    switch(action.type){
        case swaggerConstant.SWAGGER_REQUEST_STARTED:
            return {
                ...state,
                loading: true
            };
        case swaggerConstant.SWAGGER_REQUEST_FAILURE:
            return {
                ...state,
                error: action.payload.error
            };
        case swaggerConstant.SWAGGER_REQUEST_SUCCESS:
            return{
                ...state,
                loading: false,
                error: null,
                docs: action.payload.docs,
            };
        default:
            return state;
    }
};

export default SwaggerDocsReducer;