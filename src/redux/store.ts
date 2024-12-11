import { configureStore } from '@reduxjs/toolkit';
import TreeReducer from "./treeSlice"

const store = configureStore({
  reducer: {
    trees: TreeReducer,
  }, 
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
