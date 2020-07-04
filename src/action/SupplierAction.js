import axios from "axios";
axios.defaults.baseURL = `http://${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/`;

export const SupplierConst = {
    REQUEST_ON_SUPPLIER_STARTED: "REQUEST_ON_SUPPLIER_STARTED",
    REQUEST_ON_SUPPLIER_FAILURE: "REQUEST_ON_SUPPLIER_FAILURE",
    REQUEST_ON_SUPPLIER_SUCCESS: "REQUEST_ON_SUPPLIER_SUCCESS"
};

export const getSuppliers = () => {
    return (dispatch, getState) => {
        dispatch(requestOnSupplierStarted());
        const token = localStorage.getItem("token").replace(/['"]+/g, '');
        axios.get(`users/suppliers`, { headers: {"Authorization" : `Bearer ${token}`} })
            .then(res => {
                dispatch(requestOnSupplierSuccess(res.data))
            })
            .catch(err => dispatch(requestOnSupplierFailure(err.message)));
    }
};

const requestOnSupplierStarted = () => {
    return {
        type: SupplierConst.REQUEST_ON_SUPPLIER_STARTED
    }
};

const requestOnSupplierSuccess= (suppliers) => {
    return {
        type: SupplierConst.REQUEST_ON_SUPPLIER_SUCCESS,
        payload: {
            suppliers
        }
    }
};

const requestOnSupplierFailure = (error) => {
    return {
        type: SupplierConst.REQUEST_ON_SUPPLIER_FAILURE,
        payload: {
            error
        }
    }
};

export const updateSupplier = (suppliers, supplier) => {
    suppliers = suppliers.map(p => (p.user.id === supplier.user.id) ? supplier : p);
    return (dispatch, getState) => {
        dispatch(requestOnSupplierStarted());
        const token = localStorage.getItem("token").replace(/['"]+/g, '');
        axios.put(`users/${supplier.user.id}`, supplier.user, {headers: {"Authorization": `Bearer ${token}`}})
            .then(res => {
                dispatch(requestOnSupplierSuccess(suppliers))
            })
            .catch(err => dispatch(requestOnSupplierFailure(err.message)));
    }
};

export const addSupplier = (suppliers, supplier) => {
    return (dispatch, getState) => {
        dispatch(requestOnSupplierStarted());
        const token = localStorage.getItem("token").replace(/['"]+/g, '');
        axios.post(`users/suppliers/create`, supplier.user, {headers: {"Authorization": `Bearer ${token}`}})
            .then(res => {
                dispatch(requestOnSupplierSuccess([...suppliers, {user: res.data, nbProduits: supplier.nbProduits}]))
            })
            .catch(err => dispatch(requestOnSupplierFailure(err.message)));
    }
};

export const deleteSupplier = (suppliers, supplier) => {
    return (dispatch, getState) => {
        dispatch(requestOnSupplierStarted());
        const token = localStorage.getItem("token").replace(/['"]+/g, '');
        axios.delete(`users/${supplier.user.username}`, {headers: {"Authorization": `Bearer ${token}`}})
            .then(res => {
                dispatch(requestOnSupplierSuccess([...suppliers.slice(0, suppliers.findIndex(elem => elem.user.id === supplier.user.id)), ...suppliers.slice(suppliers.findIndex(elem => elem.user.id === supplier.user.id)+1)]))
            })
            .catch(err => dispatch(requestOnSupplierFailure(err.message)));
    }
};