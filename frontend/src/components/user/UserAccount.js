import React, { Fragment } from "react";
import { MDBBtn } from "mdb-react-ui-kit";
import "../css/UserAccount.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../actions/userAction";

const UserAccount = ({ user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function logoutUser() {
    dispatch(logout());
    {
      alert("User Logged Out Sucessfully");
    }
    navigate("/");
  }
  function addpet() {
    navigate("/newpet");
  }
  function mypet() {
    navigate("/mypets");
  }
  function myreqst() {
    navigate("/requests");
  }
  return (
    <Fragment>
      <div className="container2">
        <div>
          <img className="userProfile" src={user.avatar.url} alt="Post Image" />

          <h1>Welcome, {user.name}</h1>

          <div className="user-btns">
            <MDBBtn
              rounded
              className="mx-2 secBtn"
              color="secondary"
              onClick={addpet}
            >
              Add Pet
            </MDBBtn>
            <MDBBtn
              rounded
              className="mx-2 secBtn"
              color="dark"
              onClick={logoutUser}
            >
              Logout
            </MDBBtn>
          </div>
          <div className="user-btn-2">
            <MDBBtn
              rounded
              className="mx-2 secBtn"
              color="secondary"
              onClick={mypet}
            >
              My Pets
            </MDBBtn>
            <MDBBtn
              rounded
              className="mx-2 secBtn"
              color="secondary"
              onClick={myreqst}
            >
              My Requests
            </MDBBtn>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default UserAccount;
