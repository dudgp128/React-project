import { combineReducers } from 'redux';
import auth from '../api/auth/index';
import loading from './loading';

const rootReducer = combineReducers({
  auth,
  loading,
});

export default rootReducer;
