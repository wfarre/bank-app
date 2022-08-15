import "./App.css";

import NavBar from "./Components/NavBar";
import Footer from "./Components/Footer";
import Hero from "./Components/Home/Hero";
import Features from "./Components/Home/Features";

import { selectAuth } from "./selector";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { setUserAuthorization } from "./features/authorization";
import { fetchOrUpdateUser } from "./features/userBis";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector(selectAuth);
  const token = useSelector(selectAuth).token;
  const userIsAuthorized = auth.isAuthorized;

  useEffect(() => {
    if (auth.token === null) {
      const token = localStorage.getItem("token");
      if (token) {
        dispatch(setUserAuthorization(token));
      }
    }
  }, [dispatch, auth]);

  useEffect(() => {
    if (userIsAuthorized) {
      dispatch(fetchOrUpdateUser(token));
      navigate("/profile");
    }
  }, [token, navigate, userIsAuthorized, dispatch]);

  return (
    <div className="App">
      <NavBar />
      <main>
        <Hero />
        <Features />
      </main>
      <Footer />
    </div>
  );
}

export default App;
