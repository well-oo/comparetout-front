import axios from "axios";
axios.defaults.baseURL = `http://${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/`;


export const ProductTypeConst = {
    REQUEST_ON_PRODUCT_TYPE_STARTED: "REQUEST_ON_PRODUCT_TYPE_STARTED",
    REQUEST_ON_PRODUCT_TYPE_FAILURE: "REQUEST_ON_PRODUCT_TYPE_FAILURE",
    REQUEST_ON_PRODUCT_TYPE_SUCCESS: "REQUEST_ON_PRODUCT_TYPE_SUCCESS"
};

export const getAllProductType = () => {
    return (dispatch, getState) => {
        dispatch(requestOnProductTypeStarted());
        axios.get("api/productTypes/")
            .then(res => {
                dispatch(requestOnProductTypeSuccess(res.data))
            })
            .catch(err => dispatch(requestOnProductTypeFailure(err.message)))
    }
};

export const deleteProductType = (productsType, idProductType) => {
    return (dispatch, getState) => {
        dispatch(requestOnProductTypeStarted());
        const token = localStorage.getItem("token").replace(/['"]+/g, '');
        axios.delete(`api/productTypes/${idProductType}`, { headers: {"Authorization" : `Bearer ${token}`} })
            .then(res => {
                dispatch(requestOnProductTypeSuccess(productsType))
            })
            .catch(err => dispatch(requestOnProductTypeFailure(err.message)));
    }
};

export const updateProductType = (productsType, productType) => {
    return (dispatch, getState) => {
        dispatch(requestOnProductTypeStarted());
        const token = localStorage.getItem("token").replace(/['"]+/g, '');
        axios.put(`api/productTypes/${productType.idProductType}`, productType, { headers: {"Authorization" : `Bearer ${token}`} })
            .then(res => {
                dispatch(requestOnProductTypeSuccess(productsType))
            })
            .catch(err => dispatch(requestOnProductTypeFailure(err.message)));
    }
};

export const createProductType = (productsType, productType) => {
    return (dispatch, getState) => {
        dispatch(requestOnProductTypeStarted());
        const token = localStorage.getItem("token").replace(/['"]+/g, '');
        axios.post("api/productTypes", productType, { headers: {"Authorization" : `Bearer ${token}`} })
            .then(res => {
                dispatch(requestOnProductTypeSuccess([...productsType, res.data]))
            })
            .catch(err => dispatch(requestOnProductTypeFailure(err.message)));
    }
};

const requestOnProductTypeStarted = () => {
  return {
      type: ProductTypeConst.REQUEST_ON_PRODUCT_TYPE_STARTED
  }
};

const requestOnProductTypeSuccess = (productsType) => {
    return {
        type: ProductTypeConst.REQUEST_ON_PRODUCT_TYPE_SUCCESS,
        payload: {
            productsType
        }
    }
};

const requestOnProductTypeFailure = (error) => {
    return {
        type: ProductTypeConst.REQUEST_ON_PRODUCT_TYPE_FAILURE,
        payload: {
            error
        }
    }
};