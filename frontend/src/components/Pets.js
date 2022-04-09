import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { clearErrors, getPet } from "../actions/petAction";
import PetCard from "./PetCard";
import "./css/Pets.css";
import Pagination from "react-js-pagination";
import Metadata from "./Metadata";

const Pets = () => {
  const { keyword } = useParams();
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);

  const { pets, loading, error, petsCount, resultPerPage } = useSelector(
    (state) => state.pets
  );

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const keyWord = keyword;
  useEffect(() => {
    dispatch(getPet(keyWord, currentPage));
  }, [dispatch, keyWord, currentPage]);

  return (
    <Fragment>
      <Metadata title="Pets -PetMate" />
      <div className="pet__container">
        {pets && pets.map((pet) => <PetCard pet={pet} />)}
      </div>
      {resultPerPage < petsCount && (
        <div className="paginationBox">
          <Pagination
            activePage={currentPage}
            itemsCountPerPage={resultPerPage}
            totalItemsCount={petsCount}
            onChange={setCurrentPageNo}
            nextPageText="Next"
            prevPageText="Prev"
            firstPageText="1st"
            lastPageText="Last"
            itemClass="page-item"
            linkClass="page-link"
            activeClass="pageItemActive"
            activeLinkClass="pageLinkActive"
          />
        </div>
      )}
    </Fragment>
  );
};

export default Pets;
