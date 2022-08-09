import mainNavLogo from "../../src/img/argentBankLogo.png";
import Footer from "../Components/Footer";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectAuth, selectIsLoggedIn, selectUser } from "../selector";
import * as actionLogin from "../features/auth";
import { useEffect, useState } from "react";
// import { updateUser } from "../features/updateUser";
import { updateUser } from "../features/userBis";

import store from "../store";
import { fetchOrUpdateUser } from "../features/userBis";

function Profile() {
  const dispatch = useDispatch();
  const [editIsOpen, setEditIsOpen] = useState(false);
  const [newName, setNewName] = useState({
    firstName: "",
    lastName: "",
  });
  const user = useSelector(selectUser).data;
  const userIsAuthorized = useSelector(selectUser).isAuthorized;
  const userBis = useSelector(selectUser);
  const token = useSelector(selectAuth).token;
  const token2 = localStorage.getItem(token);

  function handleEdit() {
    setEditIsOpen(true);
  }

  function handleCancel() {
    setEditIsOpen(false);
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(token);
    dispatch(updateUser(newName, token));
    // dispatch(updateUser(newName, token));
    setEditIsOpen(false);
    // dispatch(fetchOrUpdateUser(token2));

    // dispatch(user.data);
    // console.log(userBis);

    // if (userIsAuthorized) {
    //   async () => {
    //     try {
    //       const res = await fetch("http://localhost:3001/api/v1/user/profile", {
    //         method: "PUT",
    //         headers: {
    //           Authorization: "Bearer" + mytoken,
    //           accept: "application/json",
    //         },
    //       });
    //       const data = await res.json();
    //       // store.dispatch(userResolved(data.body));
    //     } catch (err) {
    //       console.log(err);
    //     }
    //   };
    // }
  }

  // useEffect(() => {
  //   dispatch(fetchOrUpdateUser(token2));
  // }, [setEditIsOpen]);

  if (userIsAuthorized) {
    return (
      <div>
        <nav className="main-nav">
          <Link className="main-nav-logo" to={"/"}>
            <img
              className="main-nav-logo-image"
              src={mainNavLogo}
              alt="Argent Bank Logo"
            />
            <h1 className="sr-only">Argent Bank</h1>
          </Link>
          <div>
            <a className="main-nav-item" href="./user.html">
              <i className="fa fa-user-circle"></i>
              {user.firstName}
            </a>
            <Link
              className="main-nav-item"
              to={"/"}
              onClick={dispatch(actionLogin.logout)}
            >
              <i className="fa fa-sign-out"></i>
              Sign Out
            </Link>
          </div>
        </nav>
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
