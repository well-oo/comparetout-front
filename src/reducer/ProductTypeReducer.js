import {ProductTypeConst} from "../action/ProductTypeAction";

const initialState = {
    productsType : null,
    loading: false,
    error: null
};

const ProductTypeReducer = (state = initialState, action) => {
    switch (action.type) {
        case (ProductTypeConst.REQUEST_ON_PRODUCT_TYPE_STARTED):
            return {
                ...state,
                loading: true
            };
        case (ProductTypeConst.REQUEST_ON_PRODUCT_TYPE_FAILURE):
            return {
                ...state,
                error: action.payload.error
            };
        case (ProductTypeConst.REQUEST_ON_PRODUCT_TYPE_SUCCESS):
            return {
                ...state,
                loading: false,
                error: null,
                productsType: action.payload.productsType
            };
        default:
            return{
                ...state
            }
    }
};

export default ProductTypeReducer;