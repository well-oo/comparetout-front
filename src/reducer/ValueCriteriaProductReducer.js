import {valueCriteriaProductConst} from "../action/ValueCriteriaProductAction";

const initialState = {
    values : null,
    loading: false,
    error: null
};

const ValueCriteriaProductReducer = (state = initialState, action) => {
    switch (action.type) {
        case valueCriteriaProductConst.REQUEST_ON_VALUE_CRITERIA_PRODUCT_STARTED:
            return {
                ...state,
                loading: true
            };
        case valueCriteriaProductConst.REQUEST_ON_VALUE_CRITERIA_PRODUCT_FAILURE:
            return {
                ...state,
                error: action.payload.error
            };
        case valueCriteriaProductConst.REQUEST_ON_VALUE_CRITERIA_PRODUCT_SUCCESS:
            return{
                ...state,
                loading: false,
                error: null,
                values  : {
                    ...state.values,
                    [action.payload.idCriteria] : action.payload.values
                }
            };
        case valueCriteriaProductConst.RESET_ENUM_LIST_TEXTUEL:
            return{
              ...state,
              loading: false,
              error: null,
              values : null
            };
        default:
            return state;
    }
};

export default ValueCriteriaProductReducer;