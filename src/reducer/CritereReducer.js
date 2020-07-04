import {CritereConst} from "../action/CritereAction";

const initialState = {
    criteres : null,
    loading: false,
    error: null
};

const CritereReducer = (state = initialState, action) => {
    switch (action.type) {
        case (CritereConst.REQUEST_ON_CRITERE_STARTED):
            return {
                ...state,
                loading: true
            };
        case (CritereConst.REQUEST_ON_CRITERE_FAILURE):
            return {
                ...state,
                error: action.payload.error
            };
        case (CritereConst.REQUEST_ON_CRITERE_SUCCESS):
            return {
                ...state,
                loading: false,
                error: null,
                criteres: action.payload.criteres
            };
        default:
            return{
                ...state
            }
    }
};

export default CritereReducer;