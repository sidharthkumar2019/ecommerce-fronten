import { combineReducers } from 'redux';
import categoryReducer from './category';

const rootReducer = combineReducers({
    category: categoryReducer
});

export default rootReducer;