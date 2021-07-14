import { all, fork } from '@redux-saga/core/effects';
import userSaga from './user';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:4000';
axios.defaults.withCredentials = true;

export default function* rootSaga() {
	yield all([fork(userSaga)]);
}
