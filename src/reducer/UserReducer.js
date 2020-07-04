import { userConstants } from '../action/UserAction';

const initialState = {
    user : null,
    token: null,
    loading: false,
    error: null,
    success: null
};

const UserReducer = (state = initialState, action) => {
    switch(action.type){
        case userConstants.LOGIN_STARTED:
            return {
                ...state,
                loading: true
            };
        case userConstants.LOGIN_FAILURE:
            return {
                ...state,
                error: action.payload.error
            };
        case userConstants.LOGIN_SUCCESS:
            return{
                ...state,
                loading: false,
                error: null,
                user: action.payload.user,
                token: localStorage.getItem("token")
            };
        case userConstants.LOGOUT:
            return {
                ...state,
                user: null,
                loading: false,
                error: null,
                token: 0
            };
        case userConstants.UPDATE_PASSWORD_STARTED:
            return {
                ...state,
                loading: true
            };
        case userConstants.UPDATE_PASSWORD_SUCCESS:
            return {
                ...state,
                success: action.payload.success,
                error: null
            };
        case userConstants.UPDATE_PASSWORD_FAILURE:
            return {
                ...state,
                error: action.payload.error,
                success: null
            };
        case userConstants.RESET_ERROR:
            return {
                ...state,
                error: null
            };
        case userConstants.RESET_SUCCESS:
            return {
                ...state,
                success: null
            };
        default:
            return state;
    }
};

export default UserReducer;