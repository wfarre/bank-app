import Home from "../Home";
import Profile from "../Profile";
import Login from "../Login";
import { Route, Routes } from "react-router-dom";
import "../../assets/App.css";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default Router;
