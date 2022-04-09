import React from "react";
import { Link } from "react-router-dom";

const PetCard = ({ pet }) => {
  return (
    <Link className="petCard" to={`/pet/${pet._id}`}>
      <img
        src={pet.images[0].url}
        alt={pet.name}
        width={"400px"}
        height={"180px"}
      />
      <span className="petName">{pet.name}</span>
      <p>
        <b>Age: </b>
        {pet.age}
      </p>
      <p>
        <b>Breed: </b>
        {pet.breed}
      </p>
      <p>
        <i class="fas fa-map-marker-alt"></i>
        {"\u00A0"}
        <b> {pet.location} </b>
      </p>
    </Link>
  );
};

export default PetCard;
