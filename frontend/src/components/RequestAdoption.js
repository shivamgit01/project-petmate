import React, { Fragment, useState, useEffect } from "react";
import "./NewPet.css";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Metadata from "./Metadata";
import { Button } from "@material-ui/core";
import { NEW_ADOPT_RESET } from "../constants/adoptConstants";
import { clearErrors, newRequest } from "../actions/adoptAction";
const RequestAdoption = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  let navigate = useNavigate();
  const { loading, error, success } = useSelector((state) => state.adoptReq);

  const [ques1, setQ1] = useState("");
  const [ques2, setQ2] = useState("");
  const [ques3, setQ3] = useState("");
  const [phoneNo, setPhone] = useState("");
  const [locationState, setState] = useState("");
  const [city, setLocation] = useState("");
  const [pinCode, setPincode] = useState("");

  const locationStates = [
    "Andaman and Nicobar Islands",
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chandigarh",
    "Chhattisgarh",
    "Dadra and Nagar Haveli",
    "Daman and Diu",
    "Delhi",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jammu and Kashmir",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Lakshadweep",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Orissa",
    "Pondicherry",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Tripura",
    "Uttaranchal",
    "Uttar Pradesh",
    "West Bengal",
  ];

  useEffect(() => {
    if (error) {
      alert(`Error Occured!`);
      console.log(error);
      dispatch(clearErrors());
    }
    if (success) {
      alert("Adoption Request Sent Successfully");
      navigate("/");
      dispatch({ type: NEW_ADOPT_RESET });
    }
  }, [dispatch, error, success, id]);

  const createRequestSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("ques1", ques1);
    myForm.set("ques2", ques2);
    myForm.set("ques3", ques3);
    myForm.set("phoneNo", phoneNo);
    myForm.set("locationState", locationState);
    myForm.set("city", city);
    myForm.set("pinCode", pinCode);
    dispatch(newRequest(myForm, id));
  };

  return (
    <Fragment>
      <Metadata title="Adoption Request" />
      <div className="dashboard">
        <div className="newPetContainer">
          <form className="addPetForm" onSubmit={createRequestSubmitHandler}>
            <h1>Adoption Survey Form</h1>
            <div>
              <input
                type="text"
                placeholder="Question 1"
                required
                value={ques1}
                onChange={(e) => setQ1(e.target.value)}
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Question 2"
                required
                value={ques2}
                onChange={(e) => setQ2(e.target.value)}
              ></input>
            </div>
            <div>
              <input
                type="text"
                placeholder="Question 3"
                required
                value={ques3}
                onChange={(e) => setQ3(e.target.value)}
              />
            </div>
            <div>
              <input
                type="number"
                placeholder="Phone Number"
                required
                value={phoneNo}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div>
              <input
                type="number"
                placeholder="Pincode"
                required
                value={pinCode}
                onChange={(e) => setPincode(e.target.value)}
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Enter your city"
                required
                value={city}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <div>
              <select onChange={(e) => setState(e.target.value)}>
                <option value="">Select State</option>
                {locationStates.map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
            </div>
            {/* <div>
              <input
                type="number"
                placeholder="PetId"
                required
                value={petid}
                onChange={(e) => setPetid(e.target.value)}
              />
            </div> */}
            <Button
              id="createPetBtn"
              type="submit"
              disabled={loading ? true : false}
            >
              Send Request
            </Button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default RequestAdoption;
