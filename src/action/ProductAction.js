import axios from "axios";
axios.defaults.baseURL = `http://${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/`;

export const ProductConst = {
    REQUEST_ON_PRODUCT_STARTED: "REQUEST_ON_PRODUCT_STARTED",
    REQUEST_ON_PRODUCT_FAILURE: "REQUEST_ON_PRODUCT_FAILURE",
    REQUEST_ON_PRODUCT_SUCCESS: "REQUEST_ON_PRODUCT_SUCCESS",
    REQUEST_ON_ONE_PRODUCT_SUCCESS: "REQUEST_ON_ONE_PRODUCT_SUCCESS",
    RESET_PRODUCT_LIST: "RESET_PRODUCT_LIST",
    RESET_TO_INITIAL_STATE: "RESET_TO_INITIAL_STATE"
};

export const getProductsByProductType = (idProductType) => {
    return (dispatch, getState) => {
        dispatch(requestOnProductStarted());
        axios.get(`api/products/productType/${idProductType}`)
            .then(res => {
                dispatch(requestOnProductSuccess(res.data))
            })
            .catch(err => dispatch(requestOnProductFailure(err.message)));
    }
};

export const getProductsByProductTypePageable = (idProductType, pageable) => {
    return (dispatch, getState) => {
        dispatch(requestOnProductStarted());
        axios.get(`api/products/productTypePagination/${idProductType}?page=${pageable}&size=16`)
            .then(res => {
                dispatch(requestOnProductSuccess(res.data))
            })
            .catch(err => dispatch(requestOnProductFailure(err.message)));
    }
};



export const getSearchProducts = (newSearch, strSearch, idProductType, pageable) => {
    return (dispatch, getState) => {
        dispatch(requestOnProductStarted());
        axios.get(`api/products?idProductType=${idProductType}&page=${pageable}&size=16&search=${strSearch}`)
            .then(res => {
                dispatch(requestOnProductSuccess(res.data, newSearch))
            })
            .catch(err => dispatch(requestOnProductFailure(err)));
    }
};

export const getProductsByProductTypeAndUser = (idProductType) => {
    return (dispatch, getState) => {
        dispatch(requestOnProductStarted());
        const token = localStorage.getItem("token").replace(/['"]+/g, '');
        axios.get(`api/products/user/productType/${idProductType}`, { headers: {"Authorization" : `Bearer ${token}`} })
            .then(res => {
                dispatch(requestOnProductSuccess(res.data))
            })
            .catch(err => dispatch(requestOnProductFailure(err.message)));
    }
};

const requestOnOneProductSuccess= product => {
    return {
        type: ProductConst.REQUEST_ON_ONE_PRODUCT_SUCCESS,
        payload: {
            product
        },
    }
};

export const getProductByID = idProduct => {
    return (dispatch, getState) => {
        dispatch(requestOnProductStarted());
        axios.get(`api/products/${idProduct}`)
            .then(res => {
                dispatch(requestOnOneProductSuccess(res.data))
            })
            .catch(err => dispatch(requestOnProductFailure(err.message)));
    }
};

const requestOnProductStarted = () => {
    return {
        type: ProductConst.REQUEST_ON_PRODUCT_STARTED
    }
};

const requestOnProductSuccess= (products, search = null) => {
    return {
        type: ProductConst.REQUEST_ON_PRODUCT_SUCCESS,
        payload: {
            products
        },
        search: search
    }
};

const requestOnProductFailure = (error) => {
    return {
        type: ProductConst.REQUEST_ON_PRODUCT_FAILURE,
        payload: {
            error
        }
    }
};

export const addProduct = (products, product) => {
    return (dispatch, getState) => {
        dispatch(requestOnProductStarted());
        const token = localStorage.getItem("token").replace(/['"]+/g, '');
        axios.post("api/products", product, { headers: {"Authorization" : `Bearer ${token}`} })
            .then(res => {
                dispatch(requestOnProductSuccess([...products, res.data]))
            })
            .catch(err => dispatch(requestOnProductFailure(err.message)));
    }
};

export const deleteProduct = (products, idProduct) => {
  return (dispatch, getState) => {
      dispatch(requestOnProductStarted());
      const token = localStorage.getItem("token").replace(/['"]+/g, '');
      axios.delete(`api/products/${idProduct}`, { headers: {"Authorization" : `Bearer ${token}`} })
          .then(res => {
              dispatch(requestOnProductSuccess(products))
          })
          .catch(err => dispatch(requestOnProductFailure(err.message)));
  }
};

export const updateProduct = (products, product) => {
  return (dispatch, getState) => {
      dispatch(requestOnProductStarted());
      const token = localStorage.getItem("token").replace(/['"]+/g, '');
      axios.put(`api/products/${product.idProduct}`, product, { headers: {"Authorization" : `Bearer ${token}`} })
          .then(res => {
              dispatch(requestOnProductSuccess(products))
          })
          .catch(err => dispatch(requestOnProductFailure(err.message)));
  }
};

export const resetProductList = () => {
    return {
        type: ProductConst.RESET_PRODUCT_LIST
    }
};

export const resetToInitialState = () => {
    return {
        type: ProductConst.RESET_TO_INITIAL_STATE
    }
};