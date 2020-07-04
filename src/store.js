import UserReducer from "./reducer/UserReducer";
import {combineReducers} from "redux";
import BackOfficeReducer from "./reducer/BackOfficeReducer";
import ProductTypeReducer from "./reducer/ProductTypeReducer";
import ProductReducer from "./reducer/ProductReducer";
import SwaggerDocsReducer from "./reducer/SwaggerDocsReducer";
import SupplierReducer from "./reducer/SupplierReducer";
import CritereReducer from "./reducer/CritereReducer";
import ComparisonMethodReducer from "./reducer/ComparisonMethodReducer";
import ValueCriteriaProductReducer from "./reducer/ValueCriteriaProductReducer"

const reducer = combineReducers(
    {
        UserReducer,
        SupplierReducer,
        BackOfficeReducer,
        ProductTypeReducer,
        ProductReducer,
        SwaggerDocsReducer,
        CritereReducer,
        ComparisonMethodReducer,
        ValueCriteriaProductReducer
    }
);

export default reducer;