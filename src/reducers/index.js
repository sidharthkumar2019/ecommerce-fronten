import { combineReducers } from 'redux';
import categoryReducer from './category';
import productReducer from './product';
import authReducer from './auth';
import cartReducer from './cart';

const rootReducer = combineReducers({
    category: categoryReducer,
    product: productReducer,
    auth: authReducer,
    cart: cartReducer
});

export default rootReducer;