import { combineReducers } from 'redux';
import categoryReducer from './category';
import productReducer from './product';

const rootReducer = combineReducers({
    category: categoryReducer,
    product: productReducer
});

export default rootReducer;