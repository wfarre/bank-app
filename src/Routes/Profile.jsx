import Footer from "../Components/Footer/Footer";
import NavBar from "../Components/NavBar/NavBar";

import { useDispatch, useSelector } from "react-redux";
import { selectAuth, selectUser } from "../selector";
import { useEffect } from "react";
import { setUserAuthorization } from "../features/authorization";
import { useNavigate } from "react-router-dom";
import { fetchOrUpdateUser } from "../features/userBis";
import EditForm from "../Components/pages/Profile/EditForm/EditForm";
import TransactionSection from "../Components/pages/Profile/TransactionSection/TransactionSection";

/**
 * Render the profile page
 * @return the profile page
 */
function Profile() {
  const user = useSelector(selectUser).data;
  const userIsAuthorized = useSelector(selectUser).isAuthorized;
  const authToken = useSelector(selectAuth).token;
  const auth = useSelector(selectAuth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const lastLoginTime = localStorage.getItem("lastLoginTime");
    const nowTime = new Date(Date.now()).getTime();
    const timePastSinceLastLogin = nowTime - lastLoginTime;
    /**
     * code to test the code if the token expires
     **/
    // const timePastSinceLastLogin = 60 * 60 * 24 * 10200;
    const timeAllowed = 60 * 60 * 24 * 1000;

    /**
     * We check if there is a token is in the local storage and if it hasn't expired.
     * if there is a token, then the user is sent to the profile page,
     * else he will redirected to the home page
     */
    if (auth.token === null) {
      const token = localStorage.getItem("token");
      if (token) {
        if (timePastSinceLastLogin > timeAllowed) {
          localStorage.removeItem("token");
          localStorage.removeItem("lastLoginTime");
          return;
        }
        dispatch(setUserAuthorization(token));
      }
    }
  }, [dispatch, auth, navigate]);

  /**
   * we checked if the use is authorized
   * if the user is authorized, he/she will have access to his/her profile page
   * else, he/she will be redirected to the home page
   */
  useEffect(() => {
    if (auth.isAuthorized) {
      dispatch(fetchOrUpdateUser(auth.token));
    }

    if (!auth.isAuthorized) {
      navigate("/");
    }
  }, [auth, navigate, dispatch]);

  if (userIsAuthorized) {
    return (
      <div>
        <NavBar user={user} />
        <main className="main bg-dark">
          <header className="header">
            <EditForm user={user} authToken={authToken} />
          </header>
          <TransactionSection />
        </main>
        <Footer />
      </div>
    );
  }
}

export default Profile;
