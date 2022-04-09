import React, { Fragment, useState, useEffect } from "react";
import "./loginSignup.css";
import { Link, useNavigate } from "react-router-dom";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, login } from "../../actions/userAction";

const LoginSignUp = ({ location }) => {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword));
  };

  const redirect = location?.search
    ? location.search.split("=")[1]
    : "/account";

  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
    }

    if (isAuthenticated) {
      navigate(redirect);
    }
  }, [dispatch, error, isAuthenticated, redirect]);

  return (
    <Fragment>
      <div className="LoginSignUpContainer">
        <div className="LoginSignUpBox">
          <h1>Login</h1>
          <form className="loginForm" onSubmit={loginSubmit}>
            <div className="loginEmail">
              <MailOutlineIcon />
              <input
                type="email"
                placeholder="Email"
                required
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
              />
            </div>
            <div className="loginPassword">
              <LockOpenIcon />
              <input
                type="password"
                placeholder="Password"
                required
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
              />
            </div>
            <Link to="/register">
              Not Registered ? <em>SignUp</em>
            </Link>
            <input type="submit" value="Login" className="loginBtn" />
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default LoginSignUp;
