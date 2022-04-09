import React, { Fragment, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MDBBtn } from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { getPetDetails } from "../actions/petAction";
import "./css/PetDetails.css";
import Metadata from "./Metadata";
const PetDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { pet, loading, error } = useSelector((state) => state.petDetails);

  useEffect(() => {
    dispatch(getPetDetails(id));
  }, [dispatch, id]);

  function goForAdoption() {
    navigate(`/adopt/${pet._id}`);
  }
  return (
    <Fragment>
      <Metadata title="Pet Info PetMate"></Metadata>
      <div className="PetDetails">
        <div>
          <img
            src={pet?.images ? pet.images[0].url : undefined}
            className="pet__image"
          />
        </div>
        <div className="pet__info">
          <div className="partOne">
            <h1 className="pet__name">{pet.name}</h1>
            <div className="info__box">
              <h1 className="pet__smalltext">Breed: {pet.breed}</h1>
              <h1 className="pet__smalltext">Age: {pet.age}</h1>
              <h1 className="pet__smalltext">
                <i class="fas fa-map-marker-alt"></i> {pet.location}
              </h1>
            </div>
            <div className="requestBtn">
              <MDBBtn
                rounded
                className=" "
                color="secondary"
                onClick={goForAdoption}
              >
                Request For Adoption
              </MDBBtn>
            </div>
          </div>
          <div className="pet__loc">
            <p>
              <h4>Description</h4>
              <br />
              {pet.description}
            </p>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default PetDetails;
