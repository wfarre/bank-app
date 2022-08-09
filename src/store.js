import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
// import userReducer from "../src/features/user";
import authReducer from "../src/features/authorization";
import userReducer from "../src/features/userBis";

export default configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
  },
});
