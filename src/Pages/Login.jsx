import { useEffect, useState } from "react";
import Footer from "../Components/Footer/Footer";
import NavBar from "../Components/NavBar/NavBar";
import { fetchOrUpdateUser } from "../features/userBis";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectAuth } from "../selector";
import { fetchUser, setUserAuthorization } from "../features/authorization";

import { checkIfInputIsValid } from "../utils/validation";

/**
 * Render the login page
 * @return the login page
 */
function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [errorMsg, setErrorMsg] = useState({
    email: "",
    password: "",
    global: "",
  });

  const userIsAuthorized = useSelector(selectAuth).isAuthorized;
  const token = useSelector(selectAuth).token;
  const auth = useSelector(selectAuth);
  const authError = useSelector(selectAuth).error;

  /**
   * retrieve the jwt token, if user sets the option "stay connected"
   */
  useEffect(() => {
    if (auth.token === null) {
      const token = localStorage.getItem("token");
      if (token !== null) {
        dispatch(setUserAuthorization(token));
      }
    }
  }, [dispatch, auth]);

  /**
   * give authorization to the user if data are correct.
   * @param {*} e
   *
   */
  function handleSubmit(e) {
    e.preventDefault();
    // We check if the form is well filled to avoid any injection
    let errors = {};
    for (const key in credentials) {
      errors = checkIfInputIsValid(`${credentials[key]}`, key, errors);
    }
    // If there is at least an error, then we don't need to fetch the User with the credentials
    if (Object.keys(errors).length !== 0) {
      setErrorMsg(errors);
      return;
    }

    dispatch(fetchUser(credentials));
    setErrorMsg({ email: "", password: "", global: "" });
  }

  /**
   * get the user's data
   * */
  useEffect(() => {
    if (userIsAuthorized) {
      dispatch(fetchOrUpdateUser(token));
      navigate("/profile");
    }
    if (authError) {
      setErrorMsg((errorMsg) => ({
        ...errorMsg,
        global: authError + " Please enter a valid email or password",
      }));
    }
  }, [token, navigate, userIsAuthorized, dispatch, authError]);

  return (
    <div>
      <NavBar />
      <main className="main bg-dark">
        <section className="sign-in-content">
          <div className="icon-wrapper">
            <i className="fa fa-user-circle sign-in-icon"></i>
          </div>
          <h1>Sign In</h1>
          <form onSubmit={handleSubmit}>
            <div className="input-wrapper">
              <label htmlFor="username">Username</label>
              <input
                className="input"
                type="email"
                id="username"
                value={credentials.email}
                onChange={(e) =>
                  setCredentials({ ...credentials, email: e.target.value })
                }
                onBlur={() =>
                  setErrorMsg(
                    checkIfInputIsValid(credentials.email, `email`, errorMsg)
                  )
                }
              />

              <span className="error-message">{errorMsg.email}</span>
            </div>
            <div className="input-wrapper">
              <label htmlFor="password">Password</label>
              <input
                className="input"
                type="password"
                id="password"
                value={credentials.password}
                onChange={(e) =>
                  setCredentials({ ...credentials, password: e.target.value })
                }
                onBlur={() =>
                  setErrorMsg(
                    checkIfInputIsValid(
                      credentials.password,
                      `password`,
                      errorMsg
                    )
                  )
                }
              />
              <span className="error-message">{errorMsg.password}</span>
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
            <span className="error-message">{errorMsg.global}</span>
          </form>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default Login;
