import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../src/features/authorization";
import userReducer from "../src/features/userBis";

export default configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
  },
});
