import {BackOfficeConstants} from "../action/BackOfficeAction";

const initialState = {
  valueMenu : null
};

const BackOfficeReducer = (state = initialState, action) => {
    switch(action.type){
        case(BackOfficeConstants.CHANGED_MENU):
            return {
                ...state,
                valueMenu: action.menu
            };
        case(BackOfficeConstants.EMPTY):
            return {
              ...state,
              valueMenu: null
            };
        default:
            return state;
    }
};

export default BackOfficeReducer;