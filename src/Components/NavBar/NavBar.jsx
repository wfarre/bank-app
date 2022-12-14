import mainNavLogo from "./argentBankLogo.png";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectAuth, selectUser } from "../../selector";
import { setlogout } from "../../features/authorization";

function NavBar() {
  const isLoggedIn = useSelector(selectAuth).isAuthorized;
  const dispatch = useDispatch();
  const user = useSelector(selectUser).data;

  function handleLogout() {
    dispatch(setlogout());
  }

  return (
    <nav className="main-nav">
      <Link className="main-nav-logo" to={"/"}>
        <img
          className="main-nav-logo-image"
          src={mainNavLogo}
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      {isLoggedIn ? (
        <div className="menu">
          <Link className="main-nav-item" to={"/profile"}>
            <i className="fa fa-user-circle icon-nav"></i>
            {user?.firstName}
          </Link>
          <Link className="main-nav-item" onClick={handleLogout} to={"/"}>
            <i className="fa fa-sign-out icon-nav"></i>
            Sign Out
          </Link>
        </div>
      ) : (
        <div className="menu">
          <Link className="main-nav-item" to={"/login"}>
            <i className="fa fa-user-circle icon-nav"></i>
            Sign In
          </Link>
        </div>
      )}
    </nav>
  );
}

export default NavBar;
