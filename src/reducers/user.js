import { userConstants } from "../actions/constants";

const initialState = {
    address: [],
    error: null,
    loading: false
};

export default (state=initialState, action) => {
    switch(action.type) {
        case userConstants.GET_USER_ADDRESS_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case userConstants.GET_USER_ADDRESS_SUCCESS: 
            state = {
                ...state,
                loading: false,
                address: action.payload.address
            }
            break;
        case userConstants.GET_USER_ADDRESS_FAILURE:
            state = {
                ...state,
                loading: false,
                error: action.payload.error
            }
            break;
    }
    return state;
}