import React, { useEffect } from "react";
import { MDBBtn } from "mdb-react-ui-kit";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "./css/PetTile.css";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, deletePet } from "../actions/petAction";
import { DELETE_PET_RESET } from "../constants/petConstants";

const PetTile = ({ pet }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.onePet
  );

  const deletePetHandler = (id) => {
    dispatch(deletePet(id));
  };

  const mypet = (id) => {
    navigate(`/request/${id}`);
  };

  useEffect(() => {
    if (deleteError) {
      console.log(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert("Pet Removed Successfully!");
      navigate("/account");
      dispatch({ type: DELETE_PET_RESET });
    }
  }, [dispatch, deleteError, isDeleted]);

  return (
    <div className="tile-container">
      <div className="tile-image">
        <img src={pet.images[0].url} alt="Pet Image" />
      </div>
      <div className="tile-details">
        <div className="details-part1">
          <div>{pet.name}</div>
          <div>{pet.age}</div>
        </div>
        <div className="details-part2">{pet.location}</div>
        <div>
          <MDBBtn
            rounded
            className="mx-2 secBtn request_Btn"
            color="primary"
            onClick={() => mypet(pet._id)}
          >
            VIEW REQUESTS
          </MDBBtn>
          <Link to={`/remove/${pet._id}`}></Link>
          <MDBBtn
            rounded
            className="secBtn "
            color="danger"
            onClick={() => deletePetHandler(pet._id)}
          >
            <i class="fa-solid fa-trash"></i>
          </MDBBtn>
        </div>
      </div>
    </div>
  );
};

export default PetTile;
