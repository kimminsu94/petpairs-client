import axios, { AxiosResponse } from "axios";
import {
  all,
  call,
  fork,
  takeLatest,
  takeEvery,
  delay,
  put,
} from "@redux-saga/core/effects";
import {
  ISignUpRequest,
  ILogInRequest,
  IUpdateRequest,
  userActionTypes,
  IPostLikeRequest,
  IDeleteUserRequest,
  IUpdatePetImageRequest,
  updateProfileData,
  logInData,
  signupData,
  updatePetImageData,
  ILoadProfileRequest,
  ILoadCardsRequest,
  loadProfileData,
  IPostMatchRequest,
} from "../interface/iUserActType";
import { IImgFile, IPet, IUser } from "../interface/iUser";

function logInAPI(data: logInData) {
  return axios.post("https://petpairs.de/user/login", data, {
    headers: { "Content-Type": "application/json" },
  });
}

function* logIn(action: ILogInRequest) {
  try {
    const response: AxiosResponse<any> = yield call(logInAPI, action.data);
    console.log("RES", response);
    console.log("RES data", response.data);
    const token = response.data.accessToken;
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    document.cookie = `token=${token}`;
    yield put({
      type: userActionTypes.LOG_IN_SUCCESS,
      data: response.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: userActionTypes.LOG_IN_FAILURE,
      error: err.response.data,
    });
  }
}

function signupAPI(data: signupData) {
  return axios.post("https://petpairs.de/user/signup", data);
}

function* signup(action: ISignUpRequest) {
  try {
    const { data }: AxiosResponse<any> = yield call(signupAPI, action.data);
    yield delay(1000);
    yield put({
      type: userActionTypes.SIGN_UP_SUCCESS,
    });
  } catch (err) {
    console.log(err);
    yield put({
      type: userActionTypes.SIGN_UP_FAILURE,
      error: err.response.data,
    });
  }
}

function logOutAPI() {
  return axios.get("https://petpairs.de/user/logout");
}

function* logOut() {
  try {
    const response: AxiosResponse<any> = yield call(logOutAPI);
    delete axios.defaults.headers.common["Authorization"];
    yield delay(1000);
    yield put({
      type: userActionTypes.LOG_OUT_SUCCESS,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: userActionTypes.LOG_OUT_FAILURE,
      error: err.response.data,
    });
  }
}

// interface IUpdateUser {
// 	id: number;
// }
// async function updateUserAPI(data: updateProfileData, access_token: string) {
//   return axios({
//     method: 'PATCH',
//     url:,
//     data,
//     headers: { access_token },
//   })
// }

// interface ILoadProfile {
// 	data?: number;
// }
function loadProfileAPI(data: loadProfileData) {
  return axios.get("https://petpairs.de/user/userInfo");
}
function* loadProfile(action: ILoadProfileRequest) {
  try {
    // const token = yield call()

    const data: AxiosResponse<any> = yield call(loadProfileAPI, action.data);
    console.log("asdasfaw5234500ar0a897809", data);
    yield put({
      type: userActionTypes.LOAD_MYPROFILE_SUCCESS,
      data: data.data.data, // result.data
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: userActionTypes.LOAD_MYPROFILE_FAILURE,
      error: err.response.data,
    });
  }
}

interface ILoadCards {
  data: number;
}
function loadCardsAPI(data: number) {
  return axios.get("https://petpairs.de/pet/otherPetPhotoView");
}
function* loadCards(action: ILoadCardsRequest) {
  try {
    const data: AxiosResponse<any> = yield call(loadCardsAPI, action.data);
    console.log("LOADCARDS DATAAAAAAAAAAAA", data.data.data);
    yield put({
      type: userActionTypes.LOAD_CARDS_SUCCESS,
      data: data.data.data, //result.data
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: userActionTypes.LOAD_CARDS_FAILURE,
      error: err.response.data,
    });
  }
}

function updateUserAPI(data: updateProfileData) {
  return axios.post("https://petpairs.de/user/userOrPetEdit", data);
}

function* updateProfile(action: IUpdateRequest) {
  try {
    const result: AxiosResponse<any[]> = yield call(updateUserAPI, action.data);
    yield put({
      type: userActionTypes.UPDATE_PROFILE_SUCCESS,
      // data: result.data.user,
      data: result.data,
    });
    console.log(result.data);
  } catch (err) {
    console.error(err);
    yield put({
      type: userActionTypes.UPDATE_PROFILE_FAILURE,
      error: err.response.data,
    });
  }
}

// interface IUpdatePetImage {
// 	petId: number;
// 	formData: File[];
// }

function updatePetImageApi(data: updatePetImageData) {
  return axios.post(
    "https://ec2-52-79-98-228.ap-northeast-2.compute.amazonaws.com/pet/updatePetPhotoFile",
    data,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
}
function* updatePetImage(action: IUpdatePetImageRequest) {
  /* 
  const token = yield select(access_token)
  const headerParams = {
    'Authorization': `JWT ${access_token}`,
    'Content-Type': 'multipart/form-data',
  }
  */
  try {
    const { data } = yield call(updatePetImageApi, action.data);
    console.log(data);
    yield put({
      type: userActionTypes.UPDATE_PETIMAGE_SUCCESS,
      data: data,
      // data: result.data,
      // console.log(data);
    });
    console.log(data);
  } catch (err) {
    console.error(err);
    yield put({
      type: userActionTypes.UPDATE_PETIMAGE_FAILURE,
      error: err.response.data,
    });
  }
}

// interface IPostLike {
// 	id: number;
// }

// data will be  id : number

function postLikeApi(data: any) {
  return axios.post(
    "https://ec2-52-79-98-228.ap-northeast-2.compute.amazonaws.com/pet/petLike",
    data,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}

function* postLike(action: IPostLikeRequest) {
  //action: IPostLikeRequest
  try {
    const { data }: AxiosResponse<any> = yield call(postLikeApi, action.data);
    console.log("POSTLIKE DATAAAAAAAAAA", data);
    console.log(data.data);
    yield put({
      type: userActionTypes.POST_LIKE_SUCCESS,
      data: data,
      //data: result.data
    });
    if (data.data.matchedPet) {
      // data === 'success messsage'
      yield put({
        type: userActionTypes.MATCH_SUCCESS,
        data: data.data,
      });
    }
  } catch (err) {
    console.error(err);
    yield put({
      type: userActionTypes.POST_LIKE_FAILURE,
      error: err.response.data,
    });
  }
}

interface IDeleteUser {
  id: number;
}

function deleteUserApi(data: number) {
  return axios.post(
    "https://ec2-52-79-98-228.ap-northeast-2.compute.amazonaws.com/user/userDelete",
    data
  );
}

function* deleteUser(action: IDeleteUserRequest) {
  try {
    const { data } = yield call(deleteUserApi, action.data);
    yield put({
      type: userActionTypes.DELETE_USER_SUCCESS,
      data: data,
      // data: result.data
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: userActionTypes.DELETE_USER_FAILURE,
      error: err.response.data,
    });
  }
}

function postMatchApi(data: number) {
  return axios.post(
    "https://ec2-52-79-98-228.ap-northeast-2.compute.amazonaws.com/user/",
    data
  );
}

function* postMatch(action: IPostMatchRequest) {
  try {
    const { data } = yield call(postMatchApi, action.data);
    yield put({
      type: userActionTypes.POST_MATCH_SUCCESS,
      data: data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: userActionTypes.POST_MATCH_FAILURE,
      error: err.response.data,
    });
  }
}
function* watchSignUp() {
  yield takeLatest(userActionTypes.SIGN_UP_REQUEST, signup);
}

function* watchLogIn() {
  yield takeLatest(userActionTypes.LOG_IN_REQUEST, logIn);
}

function* watchLogOut() {
  yield takeLatest(userActionTypes.LOG_OUT_REQUEST, logOut);
}

function* watchLoadProfileRequest() {
  yield takeLatest(userActionTypes.LOAD_MYPROFILE_REQUEST, loadProfile);
}

function* watchLoadCardsRequest() {
  yield takeLatest(userActionTypes.LOAD_CARDS_REQUEST, loadCards);
}

function* watchProfileUpdate() {
  yield takeEvery(userActionTypes.UPDATE_PROFILE_REQUEST, updateProfile);
}

function* watchPetImageUpdate() {
  yield takeEvery(userActionTypes.UPDATE_PETIMAGE_REQUEST, updatePetImage);
}

function* watchPostLike() {
  yield takeEvery(userActionTypes.POST_LIKE_REQUEST, postLike);
}

function* watchPostSuccess() {
  yield takeLatest(userActionTypes.POST_MATCH_REQUEST, postMatch);
}
function* watchDeleteUser() {
  yield takeEvery(userActionTypes.DELETE_USER_REQUEST, deleteUser);
}

export default function* userSaga(): Generator {
  yield all([
    fork(watchLogIn),
    fork(watchLogOut),
    fork(watchProfileUpdate),
    fork(watchPetImageUpdate),
    fork(watchSignUp),
    fork(watchPostLike),
    fork(watchDeleteUser),
    fork(watchLoadProfileRequest),
    fork(watchLoadCardsRequest),
  ]);
}
