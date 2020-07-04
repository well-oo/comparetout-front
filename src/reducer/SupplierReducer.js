import {SupplierConst} from '../action/SupplierAction';

const initialState = {
    suppliers : null,
    loading: false,
    error: null
};

const SupplierReducer = (state = initialState, action) => {
    switch (action.type) {
        case (SupplierConst.REQUEST_ON_SUPPLIER_STARTED):
            return {
                ...state,
                loading: true
            };
        case (SupplierConst.REQUEST_ON_SUPPLIER_FAILURE):
            return {
                ...state,
                error: action.payload.error
            };
        case (SupplierConst.REQUEST_ON_SUPPLIER_SUCCESS):
            return {
                ...state,
                loading: false,
                error: null,
                suppliers: action.payload.suppliers
            };
        default:
            return{
                ...state
            }
    }
};

export default SupplierReducer;