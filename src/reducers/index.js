import { combineReducers } from 'redux';
import categoryReducer from './category';
import productReducer from './product';
import authReducer from './auth';

const rootReducer = combineReducers({
    category: categoryReducer,
    product: productReducer,
    auth: authReducer
});

export default rootReducer;