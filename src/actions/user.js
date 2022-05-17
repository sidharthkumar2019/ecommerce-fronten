import axios from '../helpers/axios';
import { cartConstants, userConstants } from './constants';

export const getAddress = () => {
    return async dispatch => {
        try {
            dispatch({ type: userConstants.GET_USER_ADDRESS_REQUEST });
            const res = await axios.get(`/user/getAddress`);

            if (res.status === 200) {
                const address = res.data.address.address;

                dispatch({
                    type: userConstants.GET_USER_ADDRESS_SUCCESS,
                    payload: { address }
                });
            } else {
                const { error } = res.data;
                dispatch({
                    type: userConstants.GET_USER_ADDRESS_FAILURE,
                    payload: { error }
                });
            }
        } catch (error) {
            console.log(error);
        }
    }
}

export const addAddress = (payload) => {
    return async dispatch => {
        try {
            dispatch({ type: userConstants.ADD_USER_ADDRESS_REQUEST });
            const res = await axios.post('/user/address/create', { payload });

            if (res.status === 201) {
                const { address } = res.data.address;

                dispatch({
                    type: userConstants.ADD_USER_ADDRESS_SUCCESS,
                    payload: { address }
                });
            } else {
                const { error } = res.data;
                dispatch({
                    type: userConstants.ADD_USER_ADDRESS_FAILURE,
                    payload: { error }
                });
            }
        } catch (error) {
            console.log(error);
        }
    }
}

export const addOrder = (payload) => {
    return async dispatch => {
        try {
            dispatch({ type: userConstants.ADD_USER_ORDER_REQUEST });
            const res = await axios.post('/addOrder', payload);

            if (res.status === 201) {
                console.log(res);
                dispatch({ type: cartConstants.RESET_CART });
            } else {
                const { error } = res.data;
                dispatch({
                    type: userConstants.ADD_USER_ORDER_FAILURE,
                    payload: { error }
                });
            }
        } catch (error) {
            console.log(error);
        }
    }
}

export const getOrders = () => {
    return async dispatch => {
        try {
            dispatch({ type: userConstants.GET_USER_ORDER_REQUEST });
            const res = await axios.get('/getOrders');

            if (res.status === 200) {
                console.log(res.data);
                const { orders } = res.data;
                dispatch({
                    type: userConstants.GET_USER_ORDER_SUCCESS,
                    payload: { orders }
                })
            } else {
                const { error } = res.data;
                dispatch({
                    type: userConstants.GET_USER_ORDER_FAILURE,
                    payload: { error }
                });
            }
        } catch (error) {
            console.log(error);
        }
    }
}

export const getOrder = (payload) => {
    return async dispatch => {
        try {
            console.log('payload', payload);
            dispatch({ type: userConstants.GET_USER_ORDER_DETAILS_REQUEST });
            const res = await axios.post('/getOrder', payload);

            if (res.status === 200) {
                dispatch({
                    type: userConstants.GET_USER_ORDER_DETAILS_SUCCESS,
                    payload: { order: res.data.order }
                });
            } else {
                const { error } = res.data;
                dispatch({
                    type: userConstants.ADD_USER_ORDER_FAILURE,
                    payload: { error }
                });
            }
        } catch (error) {
            console.log(error);
        }
    }
}