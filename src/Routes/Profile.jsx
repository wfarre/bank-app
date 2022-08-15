import mainNavLogo from "../../src/img/argentBankLogo.png";
import Footer from "../Components/Footer";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectAuth, selectUser } from "../selector";
import { useEffect, useState } from "react";
import { updateUser } from "../features/userBis";
import { setUserAuthorization, setlogout } from "../features/authorization";
import { useNavigate } from "react-router-dom";
import { fetchOrUpdateUser } from "../features/userBis";
import NavBar from "../Components/NavBar";

function Profile() {
  console.log(localStorage.getItem("token"));

  const dispatch = useDispatch();
  const [editIsOpen, setEditIsOpen] = useState(false);
  const [newName, setNewName] = useState({
    firstName: "",
    lastName: "",
  });
  const user = useSelector(selectUser).data;
  const userIsAuthorized = useSelector(selectUser).isAuthorized;
  const authToken = useSelector(selectAuth).token;
  const auth = useSelector(selectAuth);

  const navigate = useNavigate();

  useEffect(() => {
    if (auth.token === null) {
      const token = localStorage.getItem("token");
      if (token) {
        dispatch(setUserAuthorization(token));
      }
    }
  }, [dispatch, auth]);

  useEffect(() => {
    if (auth.isAuthorized) {
      dispatch(fetchOrUpdateUser(auth.token));
    }
    if (!auth.isAuthorized) {
      navigate("/login");
    }
  }, [auth, navigate, dispatch]);

  useEffect(() => {
    if (user) {
      setNewName({
        firstName: user.firstName,
        lastName: user.lastName,
      });
    }
  }, [user]);

  function handleEdit() {
    setEditIsOpen(true);
  }

  function handleCancel() {
    setEditIsOpen(false);
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(updateUser(newName, authToken));
    setEditIsOpen(false);
  }

  if (userIsAuthorized) {
    return (
      <div>
        <NavBar user={user} />
        <main className="main bg-dark">
          <div className="header">
            {!editIsOpen ? (
              <div className="header-data">
                <h1>
                  Welcome back
                  <br />
                  {user.firstName} {user.lastName}!
                </h1>
                <button className="edit-button" onClick={handleEdit}>
                  Edit Name
                </button>
              </div>
            ) : (
              <div className="form-wrapper">
                <h1>Welcome back</h1>
                <form className="name-form" onSubmit={handleSubmit}>
                  {/* <div className="input-wrapper"> */}
                  <input
                    className="name-input name-input--first"
                    type="text"
                    id="firstname"
                    placeholder={user.firstName}
                    onChange={(e) =>
                      setNewName({ ...newName, firstName: e.target.value })
                    }
                  />
                  <input
                    className="name-input name-input--last"
                    type="text"
                    id="firstname"
                    placeholder={user.lastName}
                    onChange={(e) =>
                      setNewName({ ...newName, lastName: e.target.value })
                    }
                  />
                  {/* </div> */}

                  {/* <div className="form-button-wrapper"> */}
                  <button
                    className="edit-button name-form-submit-btn"
                    type="submit"
                  >
                    Save
                  </button>
                  <button
                    className="edit-button cancel-btn"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                  {/* </div> */}
                </form>
              </div>
            )}
          </div>
          <h2 className="sr-only">Accounts</h2>
          <section className="account">
            <div className="account-content-wrapper">
              <h3 className="account-title">Argent Bank Checking (x8349)</h3>
              <p className="account-amount">$2,082.79</p>
              <p className="account-amount-description">Available Balance</p>
            </div>
            <div className="account-content-wrapper cta">
              <button className="transaction-button">View transactions</button>
            </div>
          </section>
          <section className="account">
            <div className="account-content-wrapper">
              <h3 className="account-title">Argent Bank Savings (x6712)</h3>
              <p className="account-amount">$10,928.42</p>
              <p className="account-amount-description">Available Balance</p>
            </div>
            <div className="account-content-wrapper cta">
              <button className="transaction-button">View transactions</button>
            </div>
          </section>
          <section className="account">
            <div className="account-content-wrapper">
              <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
              <p className="account-amount">$184.30</p>
              <p className="account-amount-description">Current Balance</p>
            </div>
            <div className="account-content-wrapper cta">
              <button className="transaction-button">View transactions</button>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    );
  }
}

export default Profile;
