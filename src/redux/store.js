import { configureStore } from '@reduxjs/toolkit';
import bodyReducer from './BodySlice';
const store = configureStore({
reducer: {
body: bodyReducer
}
});
export default store;