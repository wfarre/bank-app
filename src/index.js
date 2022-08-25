import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Profile from "./Routes/Profile";
import Login from "./Routes/Login";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import { selectUser } from "./selector";

// store.subscribe(console.log((state) => state.getState()));

console.log(selectUser(store.getState()));

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  </Provider>
);
