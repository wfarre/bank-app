import mainNavLogo from "../../src/img/argentBankLogo.png";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../selector";

function NavBar() {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  // console.log(isLoggedIn);
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
      <div>
        {/* {!isLoggedIn ?? ( */}
        <Link className="main-nav-item" to={"/login"}>
          <i className="fa fa-user-circle"></i>
          Sign In
        </Link>
        {/* )} */}

        {/* {isLoggedIn ?? (
          <div>
            <a className="main-nav-item" href="./user.html">
              <i className="fa fa-user-circle"></i>
              Tony
            </a>
            <Link className="main-nav-item" to={"/"}>
              <i className="fa fa-sign-out"></i>
              Sign Out
            </Link>
          </div>
        )} */}
      </div>
    </nav>
  );
}

export default NavBar;
