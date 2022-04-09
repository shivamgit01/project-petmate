import {
  NEW_ADOPT_FAIL,
  NEW_ADOPT_REQUEST,
  NEW_ADOPT_RESET,
  NEW_ADOPT_SUCCESS,
  CLEAR_ERRORS,
  MY_REQUEST_FAIL,
  MY_REQUEST_REQUEST,
  MY_REQUEST_SUCCESS,
  PET_REQUEST_REQUEST,
  PET_REQUEST_SUCCESS,
  PET_REQUEST_FAIL,
} from "../constants/adoptConstants";

export const newRequestReducer = (state = { adoptReq: {} }, action) => {
  switch (action.type) {
    case NEW_ADOPT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case NEW_ADOPT_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        adoptReq: action.payload.adoptReq,
      };
    case NEW_ADOPT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case NEW_ADOPT_RESET:
      return {
        ...state,
        success: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const myRequestReducer = (state = { myReqs: [] }, action) => {
  switch (action.type) {
    case MY_REQUEST_REQUEST:
      return {
        loading: true,
      };
    case MY_REQUEST_SUCCESS:
      return {
        loading: false,
        myReqs: action.payload,
      };
    case MY_REQUEST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const adoptRequestReducer = (state = { adoptReqs: [] }, action) => {
  switch (action.type) {
    case PET_REQUEST_REQUEST:
      return {
        loading: true,
      };
    case PET_REQUEST_SUCCESS:
      return {
        loading: false,
        adoptReqs: action.payload,
      };
    case PET_REQUEST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
