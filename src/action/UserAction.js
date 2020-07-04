import axios from 'axios';
import {history} from "../helper/history";
axios.defaults.baseURL = `http://${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/`;

export const userConstants = {
    LOGIN_STARTED : "LOGIN_STARTED",
    LOGIN_SUCCESS : "LOGIN_SUCCESS",
    LOGIN_FAILURE : "LOGIN_FAILURE",
    LOGOUT : "LOGOUT",
    role :{
        ADMIN: "ROLE_ADMIN",
        SUPPLIER: "ROLE_SUPPLIER"
    },
    UPDATE_PASSWORD_STARTED : "UPDATE_PASSWORD_STARTED",
    UPDATE_PASSWORD_SUCCESS : "UPDATE_PASSWORD_SUCCESS",
    UPDATE_PASSWORD_FAILURE : "UPDATE_PASSWORD_FAILURE",
    RESET_SUCCESS: "RESET_SUCCESS",
    RESET_ERROR: "RESET_ERROR"
};

export const login = (username, password) => {
    return (dispatch, getState) => {
        dispatch(loginStarted());
        axios.post(`users/signin`, null, {params : {
                username,
                password
            }})
            .then(res => {
                localStorage.setItem("token", JSON.stringify(res.data));
                axios.get(`users/me`, { headers: {"Authorization" : `Bearer ${res.data}`} })
                    .then(res => {
                        dispatch(loginSucces(res.data));
                    });
                history.push('/auth');
            })
            .catch(err => dispatch(loginFailure(err.message)));
    }
};

const loginStarted = () => {
    return {
        type: userConstants.LOGIN_STARTED
    }
};

const loginSucces = (user) => {
    return {
        type: userConstants.LOGIN_SUCCESS,
        payload: {
            user
        }
    }
};

const loginFailure = (error) => {
    return {
        type: userConstants.LOGIN_FAILURE,
        payload: {
            error
        }
    }
};

export const me = () => {
    return (dispatch, getState) => {
        const token = localStorage.getItem("token").replace(/['"]+/g, '');
        axios.get(`users/me`, { headers: {"Authorization" : `Bearer ${token}`} })
            .then(res => {
                dispatch(loginSucces(res.data));
            });
    }
};

export const logout = () => {
    localStorage.removeItem("token");
    history.push("/login");
    return {
        type : userConstants.LOGOUT
    }
};

const updatePasswordStarted = () => {
    return {
        type: userConstants.UPDATE_PASSWORD_STARTED
    }
};

const updatePasswordSuccess = (success) => {
    return {
        type: userConstants.UPDATE_PASSWORD_SUCCESS,
        payload: {
            success
        }
    }
};

const updatePasswordError = (error) => {
    return {
        type: userConstants.UPDATE_PASSWORD_FAILURE,
        payload: {
            error
        }
    }
};

export const updatePassword = (oldPassword, newPassword, verifyPassword) => {
    return (dispatch, getState) => {
        dispatch(updatePasswordStarted());
        const token = localStorage.getItem("token").replace(/['"]+/g, '');
        axios.post(`users/updatePassword`, null, {
            params : {
                oldPassword,
                newPassword,
                verifyPassword
            },
            headers: {"Authorization" : `Bearer ${token}`}
        })
        .then(success => dispatch(updatePasswordSuccess(success)))
        .catch(err => dispatch(updatePasswordError(err.message)));
    }
};


export const resetErrorAndSuccess = () => {
    return (dispatch, getState) => {
        dispatch({type: userConstants.RESET_SUCCESS});
        dispatch({type: userConstants.RESET_ERROR});
    }
};