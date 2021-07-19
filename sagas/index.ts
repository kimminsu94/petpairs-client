import { all, fork } from "@redux-saga/core/effects";
import userSaga from "./user";
import axios from "axios";

axios.defaults.baseURL = "https://petpairs.de";
axios.defaults.withCredentials = true;

export default function* rootSaga() {
  yield all([fork(userSaga)]);
}
