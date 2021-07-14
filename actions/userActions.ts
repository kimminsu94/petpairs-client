import {
	logInData,
	updateProfileData,
	userActionTypes,
} from './../interface/iUserActType';
import { IUser } from './../interface/iUser';
// 3.  액션 타입과 액션타입에 맞는 인터페이스로 액션크리에이터 만들어주기
export function logInAction(data: logInData) {
	/*
		interface logInData {
		email: string;
		password: string;
		}
	*/
	return {
		type: userActionTypes.LOG_IN_REQUEST,
		data,
	};
}

export function updateProfileRequest(data: updateProfileData) {
	return {
		type: userActionTypes.UPDATE_PROFILE_REQUEST,
		data,
	};
}

// export function updateProfileSuccess(data: updateProfileData) {
//   return {
//     type: userActionTypes.UPDATE_PROFILE_SUCCESS,
//     data,
//   };
// }

// export function updateProfileFailure(error: string) {
//   return {
//     type: userActionTypes.UPDATE_PROFILE_FAILURE,
//     error,
//   };
// }
