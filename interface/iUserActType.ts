// 1. 액션타입 지정해주기

import { IImgFile, IPet, IUser } from './iUser';

export enum userActionTypes {
	LOG_IN_REQUEST = 'LOG_IN_REQUEST',
	LOG_IN_SUCCESS = 'LOG_IN_SUCCESS',
	LOG_IN_FAILURE = 'LOG_IN_FAILURE',

	LOG_OUT_REQUEST = 'LOG_OUT_REQUEST',
	LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS',
	LOG_OUT_FAILURE = 'LOG_OUT_FAILURE',

	POST_LIKE_REQUEST = 'POST_LIKE_REQUEST',
	POST_LIKE_SUCCESS = 'POST_LIKE_SUCCESS',
	POST_LIKE_FAILURE = 'POST_LIKE_FAILURE',

	// MATCH_REQUEST = 'MATCH_REQUEST',
	MATCH_SUCCESS = 'MATCH_SUCCESS',
	// MATCH_FAILURE = 'MATCH_FAILURE',

	POST_MATCH_REQUEST = 'POST_MATCH_REQUEST',
	POST_MATCH_SUCCESS = 'POST_MATCH_SUCCESS',
	POST_MATCH_FAILURE = 'POST_MATCH_FAILURE',

	LOAD_MYPROFILE_REQUEST = 'LOAD_MYPROFILE_REQUEST',
	LOAD_MYPROFILE_SUCCESS = 'LOAD_MYPROFILE_SUCCESS',
	LOAD_MYPROFILE_FAILURE = 'LOAD_MYPROFILE_FAILURE',

	LOAD_CARDS_REQUEST = 'LOAD_CARDS_REQUEST',
	LOAD_CARDS_SUCCESS = 'LOAD_CARDS_SUCCESS',
	LOAD_CARDS_FAILURE = 'LOAD_CARDS_FAILURE',

	UPDATE_PROFILE_REQUEST = 'UPDATE_PROFILE_REQUEST',
	UPDATE_PROFILE_SUCCESS = 'UPDATE_PROFILE_SUCCESS',
	UPDATE_PROFILE_FAILURE = 'UPDATE_PROFILE_FAILURE',

	UPDATE_PETIMAGE_REQUEST = 'UPDATE_PETIMAGE_REQUEST',
	UPDATE_PETIMAGE_SUCCESS = 'UPDATE_PETIMAGE_SUCCESS',
	UPDATE_PETIMAGE_FAILURE = 'UPDATE_PETIMAGE_FAILURE',

	SIGN_UP_REQUEST = 'SIGN_UP_REQUEST',
	SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS',
	SIGN_UP_FAILURE = 'SIGN_UP_FAILURE',

	DELETE_USER_REQUEST = 'DELETE_USER_REQUEST',
	DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS',
	DELETE_USER_FAILURE = 'DELETE_USER_FAILURE',
}

export interface signupData {
	name: string | null;
	email: string | null;
	password: string;
}

export interface logInData {
	email: string | null;
	password: string;
}

export interface loadProfileData {
	id: number;
}

export interface loadProfileSuccess {
	user?: {
		id?: number;
		userName?: string | null;
		email?: any;
		password?: null | string;
	};
	pet?: null | IPet;
	// {
	// 	id?: null | number;
	// 	petName?: null | string;
	// 	breed?: null | string;
	// 	species?: null | string;
	// 	age?: null | number;
	// 	introduce?: null | string;
	// };
	fileName?: null | IImgFile[];
}

export interface postMatchSuccessData {
	id?: number;
	matchedPet?: {
		petId?: null | number;
		petName?: null | string;
		fileName?: null | IImgFile[];
	};
}
// export interface loadCardsSuccess {
// 	data: IPet[];
// }
export interface updateProfileData {
	id?: number;
	name?: string | null;
	email?: string | null;
	pet?: {
		petId?: null | number;
		petName?: null | string;
		breed?: null | string;
		age?: null | number;
		fileName?: null | IImgFile[];
		introduce?: null | string;
	};
}

export interface updateProfileSuccess {
	user?: {
		name?: string | null;
		email?: string | null;
	};
	pet?: IPet;
}
// export interface updateProfileSuccess {
// 	email?: string;
// 	name?: string;
// }
export interface updatePetImageData {
	petId?: number;
	formData?: File[];
}
// 2. 액션 크리에이터의 인터페이스 만들어주기
export interface updatePetImageSuccess {
	data: IImgFile[];
}

export interface ISignUpRequest {
	type: userActionTypes.SIGN_UP_REQUEST;
	data: signupData;
}

export interface ISignUpSuccess {
	type: userActionTypes.SIGN_UP_SUCCESS;
}

export interface ISignUpFailure {
	type: userActionTypes.SIGN_UP_FAILURE;
	error: string;
}

export interface ILogInRequest {
	type: userActionTypes.LOG_IN_REQUEST;
	data: logInData;
}

export interface ILogInSuccess {
	type: userActionTypes.LOG_IN_SUCCESS;
	data: IUser;
}

export interface ILogInFailure {
	type: userActionTypes.LOG_IN_FAILURE;
	error: string;
}

export interface ILogOutRequest {
	type: userActionTypes.LOG_OUT_REQUEST;
}

export interface IPostLikeRequest {
	type: userActionTypes.POST_LIKE_REQUEST;
	data: number;
}

export interface IPostLikeSuccess {
	type: userActionTypes.POST_LIKE_SUCCESS;
	data: number | string;
}

export interface IPostLikeFailure {
	type: userActionTypes.POST_LIKE_FAILURE;
	error: string;
}

// export interface IMatchRequest {
// 	type: userActionTypes.MATCH_REQUEST;
// 	data: number;
// }
export interface IMatchSuccess {
	type: userActionTypes.MATCH_SUCCESS;
	data: number;
}

export interface IPostMatchRequest {
	type: userActionTypes.POST_MATCH_REQUEST;
	data: number;
}

export interface IPostMatchSuccess {
	type: userActionTypes.POST_MATCH_SUCCESS;
	data: postMatchSuccessData;
}

export interface IPostMatchFailure {
	type: userActionTypes.POST_MATCH_FAILURE;
	error: string;
}
// export interface IMatchFailure {
// 	type: userActionTypes.MATCH_FAILURE;
// 	error: string;
// }
// export interface ILoadProfileRequest {
// 	type: userActionTypes.LOAD_PROFILE_REQUEST;
// 	data: IUser['id'];
// }

// export interface ILoadProfileSuccess {
// 	type: userActionTypes.LOAD_PROFILE_SUCCESS;
// 	data: IUser;
// }

// export interface ILoadProfileFailure {
// 	type: userActionTypes.LOAD_PROFILE_FAILURE;
// 	error: string;
// }

export interface ILoadProfileRequest {
	type: userActionTypes.LOAD_MYPROFILE_REQUEST;
	data: loadProfileData;
}

export interface ILoadProfileSuccess {
	type: userActionTypes.LOAD_MYPROFILE_SUCCESS;
	// data: IUser;
	data: loadProfileSuccess;
}

export interface ILoadProfileFailure {
	type: userActionTypes.LOAD_MYPROFILE_FAILURE;
	error: string;
}

export interface ILoadCardsRequest {
	type: userActionTypes.LOAD_CARDS_REQUEST;
	data: number;
}

export interface ILoadCardsSuccess {
	type: userActionTypes.LOAD_CARDS_SUCCESS;
	data: any;
}

export interface ILoadCardsFailure {
	type: userActionTypes.LOAD_CARDS_FAILURE;
	error: string;
}

export interface IUpdateRequest {
	type: userActionTypes.UPDATE_PROFILE_REQUEST;
	data: updateProfileData;
}

export interface IUpdateSuccess {
	type: userActionTypes.UPDATE_PROFILE_SUCCESS;
	data: updateProfileSuccess;
}

export interface IUpdateFailure {
	type: userActionTypes.UPDATE_PROFILE_FAILURE;
	error: string;
}

export interface IUpdatePetImageRequest {
	type: userActionTypes.UPDATE_PETIMAGE_REQUEST;
	data: updatePetImageData;
}

export interface IUpdatePetImageSuccess {
	type: userActionTypes.UPDATE_PETIMAGE_SUCCESS;
	data: updatePetImageSuccess;
}

export interface IUpdatePetImageFailure {
	type: userActionTypes.UPDATE_PETIMAGE_FAILURE;
	error: string;
}

export interface ILogOutSuccess {
	type: userActionTypes.LOG_OUT_SUCCESS;
}

export interface ILogOutFailure {
	type: userActionTypes.LOG_OUT_FAILURE;
	error: string;
}

export interface IDeleteUserRequest {
	type: userActionTypes.DELETE_USER_REQUEST;
	data: number;
}

export interface IDeleteUserSuccess {
	type: userActionTypes.DELETE_USER_SUCCESS;
	data: string;
}

export interface IDeleteUserFailure {
	type: userActionTypes.DELETE_USER_FAILURE;
	error: string;
}
// 리듀서에서 리턴 값으로 쓰기위해 인터페이스 내보내기

export type IUserActions =
	| ILogInRequest
	| ILogInSuccess
	| ILogInFailure
	| ISignUpRequest
	| ISignUpSuccess
	| ISignUpFailure
	| ILogOutRequest
	| ILogOutSuccess
	| ILogOutFailure
	| ILoadProfileRequest
	| ILoadProfileSuccess
	| ILoadProfileFailure
	| ILoadCardsRequest
	| ILoadCardsSuccess
	| ILoadCardsFailure
	| IMatchSuccess
	| IPostMatchRequest
	| IPostMatchSuccess
	| IPostMatchFailure
	| IUpdateRequest
	| IUpdateSuccess
	| IUpdateFailure
	| IUpdatePetImageRequest
	| IUpdatePetImageSuccess
	| IUpdatePetImageFailure
	| IPostLikeRequest
	| IPostLikeSuccess
	| IPostLikeFailure
	| IDeleteUserRequest
	| IDeleteUserSuccess
	| IDeleteUserFailure;
