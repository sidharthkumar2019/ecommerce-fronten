import axios from '../helpers/axios';
import {authConstants} from './constants';

export const login = (user) => {
    return async(dispatch) => {

        dispatch({type: authConstants.LOGIN_REQUEST});
        const res = await axios.post('/signin', {
            ...user 
        });

        if (res.status === 200) {
            const {token, user} = res.data;
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            dispatch({
                type: authConstants.LOGIN_SUCCESS,
                payload: {token, user}
            });
        }
        else if (res.status === 400) {
            dispatch({
                type: authConstants.LOGIN_FAILURE,
                payload: {errror: res.data.errror}
            });
        }
    };
};

export const isUserLoggedIn = () => {
    return async dispatch => {
        const token = localStorage.getItem('token');
        if (token) {
            const user = JSON.parse(window.localStorage.getItem('user'));
            dispatch({
                type: authConstants.LOGIN_SUCCESS,
                payload: {token, user}
            });
        }
        else {
            dispatch({
                type: authConstants.LOGIN_FAILURE,
                payload: {errror: 'Failed to login'}
            });
        }
    }
};

export const signout = () => {
    return async dispatch => {
        localStorage.clear();
        dispatch({ 
            type: authConstants.LOGOUT_REQUEST 
        });
    }
}