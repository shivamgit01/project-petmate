import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAdoptRequestsById } from "../actions/adoptAction";

const PetRequestsList = () => {
  const dispatch = useDispatch();

  const { id } = useParams();

  const { error, adoptReqs } = useSelector((state) => state.adoptReqs);

  useEffect(() => {
    if (error) {
      alert("Request Cannot Be Processed!");
      console.log(error);
    }
    dispatch(getAdoptRequestsById(id));
  }, [dispatch, error, id]);

  return (
    <div>
      <h1 className="myPetsHeading"> View Requests for Added Pets</h1>
      <div className="pet__container2">
        {adoptReqs && adoptReqs.map((reqe) => <div>{reqe.pet.name}</div>)}
      </div>
    </div>
  );
};

export default PetRequestsList;
