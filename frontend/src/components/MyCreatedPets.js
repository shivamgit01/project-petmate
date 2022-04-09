import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { clearErrors, getMyPets } from "../actions/petAction";
import "./css/Pets.css";
import Metadata from "./Metadata";
import PetTile from "./PetTile";

const MyCreatedPets = () => {
  const dispatch = useDispatch();

  const { loading, error, myPets } = useSelector((state) => state.myPets);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    if (error) {
      alert("Request Cannot Be Processed!");
      console.log(error);
    }
    dispatch(getMyPets());
  }, [dispatch, error]);

  return (
    <Fragment>
      <Metadata title="MyPets -PetMate" />
      <div>
        <h1 className="myPetsHeading"> Your Added Pets</h1>
        <div className="pet__container2">
          {myPets && myPets.map((pet) => <PetTile pet={pet} />)}
        </div>
      </div>
    </Fragment>
  );
};

export default MyCreatedPets;
