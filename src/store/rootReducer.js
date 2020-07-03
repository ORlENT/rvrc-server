import { combineReducers } from "redux";
import { firestoreReducer } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";
import myReducer from "./myReducer";

const rootReducer = combineReducers({
  store: myReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer,
});

export default rootReducer;
