import axios from "axios";
import {
  NEW_ADOPT_FAIL,
  NEW_ADOPT_REQUEST,
  NEW_ADOPT_RESET,
  NEW_ADOPT_SUCCESS,
  CLEAR_ERRORS,
  MY_REQUEST_SUCCESS,
  MY_REQUEST_FAIL,
  MY_REQUEST_REQUEST,
  PET_REQUEST_FAIL,
  PET_REQUEST_REQUEST,
  PET_REQUEST_SUCCESS,
} from "../constants/adoptConstants";

//form action for request survey form
export const newRequest = (reqData, id) => async (dispatch) => {
  try {
    dispatch({ type: NEW_ADOPT_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };
    const { data } = await axios.post(`/api/v1/adopt/${id}`, reqData, config);

    dispatch({
      type: NEW_ADOPT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_ADOPT_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getMyRequests = () => async (dispatch) => {
  try {
    dispatch({ type: MY_REQUEST_REQUEST });

    const { data } = await axios.get(`/api/v1/requests`);
    console.log(data);
    dispatch({
      type: MY_REQUEST_SUCCESS,
      payload: data.requests,
    });
  } catch (error) {
    dispatch({
      type: MY_REQUEST_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getAdoptRequestsById = (id) => async (dispatch) => {
  try {
    dispatch({ type: PET_REQUEST_REQUEST });
    console.log("Working here");
    const { data } = await axios.get(`/api/v1/request/${id}`);
    console.log(data);
    dispatch({
      type: PET_REQUEST_SUCCESS,
      payload: data.requests,
    });
  } catch (error) {
    dispatch({
      type: PET_REQUEST_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
