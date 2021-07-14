// 펫 인터페이스
export interface IImgFile {
	petId?: null | number;
	fileName?: null | string;
}

export interface IPet {
	petId?: null | number;
	petName?: null | string;
	breed?: null | string;
	species?: null | string;
	age?: null | number;
	matchedId?: any; //매칭된 상대 펫 ID
	fileName?: null | IImgFile[];
	like?: any; // null | number[]; // 좋아요한 상대 펫 ID
	introduce?: null | string;
}

// export interface IPetPhotos {
// 	id?: null | number;
// 	petId?: null | number;
// 	fileName?: null | IImgFile[];
// }

// 유저 인터페이스
export interface IUser {
	id?: number | null;
	name?: string | null;
	email?: string | null;
	pet?: null | IPet;
}

// 유저 리듀서 인터페이스

export interface IUserState {
	logInLoading: boolean;
	logInDone: boolean;
	logInError: null | string;
	logOutLoading: boolean;
	logOutDone: boolean;
	logOutError: null | string;
	signUpLoading: boolean;
	signUpDone: boolean;
	signUpError: null | string;
	loadProfileLoading: boolean;
	loadProfileDone: boolean;
	loadProfileError: null | string;
	loadCardsLoading: boolean;
	loadCardsDone: boolean;
	loadCardsError: null | string;
	updateProfileLoading: boolean;
	updateProfileDone: boolean;
	updateProfileError: null | string;
	updatePetImageLoading: boolean;
	updatePetImageDone: boolean;
	updatePetImageError: null | string;
	postLikeLoading: boolean;
	postLikeDone: boolean;
	postLikeError: null | string;
	postMatchLoading: boolean;
	postMatchDone: boolean;
	postMatchError: null | string;
	// matchRequest: boolean;
	matchDone: boolean;
	// matchError: null | string;
	deleteUserLoading: boolean;
	deleteUserDone: boolean;
	deleteUserError: null | string;
	me: null | IUser;
	users: null | IUser[];
	pets: null | IPet[];
	matchedPet: any;
}

//
/*
	me: {
		id: number;
		name: string;
		email: string;
		pet: {
			id: null | number | any;
			petName: null | string | any;
			breed: null | string | any;
			species: null | string[] | any;
			age: null | number | any;
			matchedId: null | number[] | any; //매칭된 상대 펫 ID
			fileName: null | string | any;
			like: null | number[] | any; // 좋아요한 상대 펫 ID
			introduce: null | string | any;
		}
	}
*/
