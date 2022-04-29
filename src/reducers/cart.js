import {cartConstants} from '../actions/constants';

const initialState = {
    cartItems: {

    },
    updatingCart: false,
    error: null
}

export default (state=initialState, action) => {
    switch (action.type) {
        case cartConstants.ADD_TO_CART_REQUEST :
            state = {
                ...state,
                updatingCart: true
            }
            break;
        case cartConstants.ADD_TO_CART_SUCCESS: 
            state = {
                ...state,
                updatingCart: false,
                cartItems: action.payload.cartItems
            }
            break;
        case cartConstants.ADD_TO_CART_FAILURE: 
            state = {
                ...state,
                updatingCart: false,
                error: action.payload.error
            }
            break;
        case cartConstants.RESET_CART:
            state = {
                ...initialState
            }
            break;
    }
    return state;
}