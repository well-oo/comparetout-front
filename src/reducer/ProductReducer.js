import {ProductConst} from "../action/ProductAction";

const initialState = {
    products : null,
    loading: false,
    error: null,
    search:null
};

const ProductReducer = (state = initialState, action) => {
    switch (action.type) {
        case (ProductConst.REQUEST_ON_PRODUCT_STARTED):
            return {
                ...state,
                loading: true
            };
        case (ProductConst.REQUEST_ON_PRODUCT_FAILURE):
            return {
                ...state,
                error: action.payload.error
            };
        case (ProductConst.REQUEST_ON_PRODUCT_SUCCESS):
            return {
                ...state,
                loading: false,
                error: null,
                products: action.payload.products,
                search: action.search
            };
        case (ProductConst.RESET_PRODUCT_LIST):
            return {
              ...state,
              products: null,
              loading: false,
              error: null
            };
        case (ProductConst.REQUEST_ON_ONE_PRODUCT_SUCCESS):
            return {
                ...state,
                product: action.payload.product
            };
        case (ProductConst.RESET_TO_INITIAL_STATE):
            return {
                ...state,
                search: null
            };
        default:
            return{
                ...state
            }
    }
};

export default ProductReducer;