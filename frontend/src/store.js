import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  petReducer,
  petDetailsReducer,
  newPetReducer,
  myPetReducer,
  onePetReducer,
} from "./reducers/petReducer";
import { userReducer } from "./reducers/userReducer";
import {
  adoptRequestReducer,
  myRequestReducer,
  newRequestReducer,
} from "./reducers/adoptReducer";

const reducer = combineReducers({
  pets: petReducer,
  petDetails: petDetailsReducer,
  user: userReducer,
  newPet: newPetReducer,
  myPets: myPetReducer,
  adoptReq: newRequestReducer,
  onePet: onePetReducer,
  myReqs: myRequestReducer,
  adoptReqs: adoptRequestReducer,
});

let initialState = {};
const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
