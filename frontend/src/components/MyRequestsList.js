import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { clearErrors, getMyRequests } from "../actions/adoptAction";
import "./css/Pets.css";
import Metadata from "./Metadata";
import PetTile from "./PetTile";
import "./css/MyRequestsList.css";
import { MDBBtn } from "mdb-react-ui-kit";

const MyRequestsList = () => {
  const dispatch = useDispatch();

  const { loading, error, myReqs } = useSelector((state) => state.myReqs);
  const { user } = useSelector((state) => state.user);

  //console.log(myReqs);
  useEffect(() => {
    if (error) {
      alert("Request Cannot Be Processed!");
      console.log(error);
    }
    dispatch(getMyRequests());
  }, [dispatch, error]);

  return (
    <>
      <Metadata title="MyPets -PetMate" />
      <div>
        <h1 className="myPetsHeading"> Adoption Requests Sent By Me</h1>
        <div className="pet__container2">
          {myReqs &&
            myReqs.map((pets) => (
              <div className="petReqTile">
                <div className="petReqTileDetail">
                  <div>
                    {
                      <img
                        src={pets.pet.images[0].url}
                        className="tile_Image"
                      />
                    }
                  </div>
                  <div>
                    <div>{pets.pet.name} </div>
                    <div>{pets.pet.breed} </div>
                    <div>{pets.pet.location} </div>
                  </div>
                </div>

                <br></br>
                <MDBBtn className="mx-2 secBtn" color="danger">
                  {pets.requestStatus}
                </MDBBtn>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default MyRequestsList;
