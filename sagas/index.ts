import { all, fork } from "@redux-saga/core/effects";
import userSaga from "./user";
import axios from "axios";

axios.defaults.baseURL =
  "https://ec2-52-79-98-228.ap-northeast-2.compute.amazonaws.com";
axios.defaults.withCredentials = true;

export default function* rootSaga() {
  yield all([fork(userSaga)]);
}
