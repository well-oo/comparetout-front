import {ComparisonMethodConst} from "../action/ComparisonMethodAction";

const initialState = {
    comparisonMethods : null,
    loading: false,
    error: null
};

const ComparisonMethodReducer = (state = initialState, action) => {
    switch (action.type) {
        case (ComparisonMethodConst.REQUEST_ON_COMPARISONMETHOD_STARTED):
            return {
                ...state,
                loading: true
            };
        case (ComparisonMethodConst.REQUEST_ON_COMPARISONMETHOD_FAILURE):
            return {
                ...state,
                error: action.payload.error
            };
        case (ComparisonMethodConst.REQUEST_ON_COMPARISONMETHOD_SUCCESS):
            return {
                ...state,
                loading: false,
                error: null,
                comparisonMethods: action.payload.comparisonMethods
            };
        default:
            return{
                ...state
            }
    }
};

export default ComparisonMethodReducer;