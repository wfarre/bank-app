import NavBar from "../Components/NavBar/NavBar";
import Footer from "../Components/Footer/Footer";
import Hero from "../Components/Pages/Home/Hero/Hero";
import Features from "../Components/Pages/Home/Features/Features";

import { selectAuth } from "../selector";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { setUserAuthorization } from "../features/authorization";
import { fetchOrUpdateUser } from "../features/userBis";

/**
 * render the home page
 * @return the home page
 */
function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector(selectAuth);
  const token = useSelector(selectAuth).token;
  const userIsAuthorized = auth.isAuthorized;

  /**
   * if the user is connected, then he/she will be redirected to his/her profile
   **/
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
      // navigate("/profile");
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
