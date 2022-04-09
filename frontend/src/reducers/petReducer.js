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
  DELETE_PET_SUCCESS,
  DELETE_PET_RESET,
} from "../constants/petConstants";

export const petReducer = (state = { pets: [] }, action) => {
  switch (action.type) {
    case ALL_PET_REQUEST:
      return {
        loading: true,
        pets: [],
      };
    case ALL_PET_SUCCESS:
      return {
        loading: false,
        pets: action.payload.pets,
        petsCount: action.payload.petsCount,
        resultPerPage: action.payload.resultPerPage,
      };
    case ALL_PET_FAIL:
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

export const petDetailsReducer = (state = { pet: {} }, action) => {
  switch (action.type) {
    case PET_DETAILS_REQUEST:
      return {
        loading: true,
        ...state,
      };
    case PET_DETAILS_SUCCESS:
      return {
        loading: false,
        pet: action.payload,
      };
    case PET_DETAILS_FAIL:
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

export const newPetReducer = (state = { pet: {} }, action) => {
  switch (action.type) {
    case NEW_PET_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case NEW_PET_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        pet: action.payload.pet,
      };
    case NEW_PET_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case NEW_PET_RESET:
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

export const myPetReducer = (state = { myPets: [] }, action) => {
  switch (action.type) {
    case MY_PETS_REQUEST:
      return {
        loading: true,
      };
    case MY_PETS_SUCCESS:
      return {
        loading: false,
        myPets: action.payload,
      };
    case MY_PETS_FAIL:
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

export const onePetReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_PET_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_PET_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };
    case DELETE_PET_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_PET_RESET:
      return {
        ...state,
        isDeleted: false,
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
