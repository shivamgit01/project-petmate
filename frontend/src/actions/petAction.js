import axios from "axios";
import {
  ALL_PET_FAIL,
  ALL_PET_REQUEST,
  ALL_PET_SUCCESS,
  CLEAR_ERRORS,
  PET_DETAILS_REQUEST,
  PET_DETAILS_FAIL,
  PET_DETAILS_SUCCESS,
  NEW_PET_FAIL,
  NEW_PET_REQUEST,
  NEW_PET_RESET,
  NEW_PET_SUCCESS,
  MY_PETS_FAIL,
  MY_PETS_REQUEST,
  MY_PETS_SUCCESS,
  DELETE_PET_FAIL,
  DELETE_PET_REQUEST,
  DELETE_PET_RESET,
  DELETE_PET_SUCCESS,
} from "../constants/petConstants";

export const getPet =
  (keyword = "", currentPage = 1) =>
  async (dispatch) => {
    try {
      dispatch({ type: ALL_PET_REQUEST });

      const { data } = await axios.get(
        `/api/v1/pets?keyword=${keyword}&page=${currentPage}`
      );

      dispatch({
        type: ALL_PET_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ALL_PET_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const getMyPets = () => async (dispatch) => {
  try {
    dispatch({ type: MY_PETS_REQUEST });

    const { data } = await axios.get(`/api/v1/mypets`);
    dispatch({
      type: MY_PETS_SUCCESS,
      payload: data.myPets,
    });
  } catch (error) {
    dispatch({
      type: MY_PETS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getPetDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PET_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/v1/pet/${id}`);

    dispatch({
      type: PET_DETAILS_SUCCESS,
      payload: data.pet,
    });
  } catch (error) {
    dispatch({
      type: PET_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

//creating new pet
export const createPet = (petData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_PET_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };
    const { data } = await axios.post(`/api/v1/newpet`, petData, config);

    dispatch({
      type: NEW_PET_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_PET_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const deletePet = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_PET_REQUEST });

    const { data } = await axios.delete(`/api/v1/remove/${id}`);

    dispatch({
      type: DELETE_PET_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_PET_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
