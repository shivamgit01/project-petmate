import React, { Fragment, useEffect } from "react";
import { MDBBtn } from "mdb-react-ui-kit";
import "../components/css/Home.css";
import PetCard from "./PetCard";
import Metadata from "./Metadata";
import { getPet } from "../actions/petAction";
import { useDispatch, useSelector } from "react-redux";

const Home = () => {
  const dispatch = useDispatch();
  const { loading, error, pets } = useSelector((state) => state.pets);
  useEffect(() => {
    dispatch(getPet());
  }, [dispatch]);

  return (
    <Fragment>
      <Metadata title="Home PetMate" />
      <div className="bg-image">
        <img
          src="https://images.unsplash.com/photo-1597595735637-05a49627ee29?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1780&q=80"
          style={{ height: "85vh" }}
        />
        <div className="mask" style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}>
          <div
            className="d-flex justify-content-center align-items-center h-100"
            style={{ flexDirection: "column", gap: "25px" }}
          >
            <p
              className="text-white mb-0"
              style={{ fontSize: "26px", fontWeight: "600" }}
            >
              #PawfectMate
            </p>
            <MDBBtn
              outline
              rounded
              className="mx-4"
              color="success"
              href="#container"
            >
              Go For Adoption
            </MDBBtn>
          </div>
        </div>
      </div>
      <h1 className="m-5" style={{ textAlign: "center" }}>
        Pets Available For Adoption
      </h1>
      <div className="container" id="container">
        {pets && pets.map((pet) => <PetCard pet={pet} />)}
      </div>
    </Fragment>
  );
};

export default Home;
