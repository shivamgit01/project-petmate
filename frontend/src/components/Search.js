import React, { useState, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { MDBBtn } from "mdb-react-ui-kit";

const Search = () => {
  let navigate = useNavigate();
  const [keyword, setKeyword] = useState("");

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      console.log(keyword);
      navigate(`/pets/${keyword}`);
    } else {
      navigate("/pets");
    }
  };

  return (
    <Fragment>
      <form
        className="searchBox d-flex input-group w-auto"
        onSubmit={searchSubmitHandler}
      >
        <input
          type="text"
          placeholder="📍Location"
          className="form-control"
          onChange={(e) => setKeyword(e.target.value)}
        ></input>
        <MDBBtn type="submit" value="Search">
          Search
        </MDBBtn>
      </form>
    </Fragment>
  );
};

export default Search;
