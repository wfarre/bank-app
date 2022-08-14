import { useEffect, useState } from "react";
import Footer from "../Components/Footer";
import NavBar from "../Components/NavBar";
// import { fetchOrUpdateUser } from "../features/user";
import { fetchOrUpdateUser } from "../features/userBis";

import store from "../store";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectAuth, selectIsLoggedIn, selectUser } from "../selector";
import { fetchUser } from "../features/authorization";

function Login() {
  const [rememberMe, setRememberMe] = useState(false);
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  // const isAuthorized = useSelector((state) => state.user.isAuthorized);

  // const [userId, setUserId] = useState("");

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userIsAuthorized = useSelector(selectAuth).isAuthorized;
  const token = useSelector(selectAuth).token;
  const user = useSelector(selectUser);

  const auth = useSelector(selectAuth);

  console.log(credentials);

  function handleSubmit(e) {
    e.preventDefault();
    // fetchOrUpdateUser(store, credentials);
    dispatch(fetchUser(credentials));
    // fetchOrUpdateUser(store, token);
  }

  useEffect(() => {
    console.log("blue");
    console.log(token);
    if (userIsAuthorized) {
      dispatch(fetchOrUpdateUser(token));
    }
  }, [token, userIsAuthorized, dispatch]);

  if (user.isAuthorized) {
    const userId = selectUser(store.getState()).data.id;
    navigate("/profile");
  }

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
                // required
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
                // required
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
            {/* <!-- PLACEHOLDER DUE TO STATIC SITE -->
            <a href="./user.html" className="sign-in-button">Sign In</a> */}
            {/* <!-- SHOULD BE THE BUTTON BELOW --> */}
            <button className="sign-in-button">Sign In</button>
          </form>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default Login;
