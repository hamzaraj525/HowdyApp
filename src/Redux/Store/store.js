import {configureStore, combineReducers} from '@reduxjs/toolkit';
import cartReducer from '../Reducer/reducer';

const reducers = combineReducers({
  cartReducer: cartReducer,
});
const store = configureStore({
  reducer: {reducers},
});
export default store;
