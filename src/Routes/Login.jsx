import { useEffect, useState } from "react";
import Footer from "../Components/Footer/Footer";
import NavBar from "../Components/NavBar/NavBar";
import { fetchOrUpdateUser } from "../features/userBis";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectAuth } from "../selector";
import { fetchUser, setUserAuthorization } from "../features/authorization";

function Login() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userIsAuthorized = useSelector(selectAuth).isAuthorized;
  const token = useSelector(selectAuth).token;
  const auth = useSelector(selectAuth);

  useEffect(() => {
    if (auth.token === null) {
      const token = localStorage.getItem("token");
      if (token) {
        dispatch(setUserAuthorization(token));
      }
    }
  }, [dispatch, auth]);

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(fetchUser(credentials));
  }

  useEffect(() => {
    if (userIsAuthorized) {
      dispatch(fetchOrUpdateUser(token));
      navigate("/profile");
    }
  }, [token, navigate, userIsAuthorized, dispatch]);

  return (
    <div>
      <NavBar />
      <main className="main bg-dark">
        <section className="sign-in-content">
          <i className="fa fa-user-circle sign-in-icon"></i>
          <h1>Sign In</h1>
          <form onSubmit={handleSubmit}>
            <div className="input-wrapper">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                value={credentials.email}
                onChange={(e) =>
                  setCredentials({ ...credentials, email: e.target.value })
                }
                required
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={credentials.password}
                onChange={(e) =>
                  setCredentials({ ...credentials, password: e.target.value })
                }
                required
              />
            </div>
            <div
              className="input-remember"
              onChange={() =>
                setCredentials({
                  ...credentials,
                  rememberMe: !credentials.rememberMe,
                })
              }
            >
              <input type="checkbox" id="remember-me" />
              <label htmlFor="remember-me">Remember me</label>
            </div>
            <button className="sign-in-button">Sign In</button>
          </form>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default Login;
