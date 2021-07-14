import { userActionTypes, IUserActions } from '../interface/iUserActType';
import { IUser, IUserState } from '../interface/iUser';
import { HYDRATE } from 'next-redux-wrapper';
export const initialState: IUserState = {
	logInLoading: false,
	logInDone: false,
	logInError: null,
	logOutLoading: false,
	logOutDone: false,
	logOutError: null,
	signUpLoading: false,
	signUpDone: false,
	signUpError: null,
	loadProfileLoading: false,
	loadProfileDone: true,
	loadProfileError: null,
	loadCardsLoading: false,
	loadCardsDone: true,
	loadCardsError: null,
	updateProfileLoading: false,
	updateProfileDone: false,
	updateProfileError: null,
	updatePetImageLoading: false,
	updatePetImageDone: false,
	updatePetImageError: null,
	postLikeLoading: false,
	postLikeDone: false,
	postLikeError: null,
	matchDone: false,
	postMatchLoading: false,
	postMatchDone: false,
	postMatchError: null,
	deleteUserLoading: false,
	deleteUserDone: false,
	deleteUserError: null,
	me: null,
	matchedPet: null,
	users: null,
	pets: null,
};

const dummyUser = (data: any): IUser => ({
	name: '사람이된성시츄',
	id: 4,
	email: 'Hello@world.com',
	pet: {
		// id: 1,
		petName: '강아지가된성민구',
		age: 84,
		breed: '시츄',
		species: '강아지',
		// fileName: ['시츄.png'],
		matchedId: [],
		introduce: '멍멍',
		like: [2], //initial  [2]
	},
});

export const dummyMe = (data: any): IUser => ({
	name: '사람이된성시츄',
	email: 'Hello@world.com',
	pet: {
		petName: '강아지가된성민구',
		age: 84,
		breed: '시츄',
		// fileName: ['시츄.png'],
		introduce: '멍멍',
		like: null,
		matchedId: null,
	},
});

export const dataSet = {
	name: '사람이된성시츄',
	email: 'Hello@world.com',
	pet: {
		petName: '강아지가된성민구',
		age: 84,
		breed: '시츄',
		fileName: '시츄.png',
	},
};

interface HydratePayload {
	user: IUserState;
}

const reducer = (
	state = initialState,
	action: IUserActions | { type: typeof HYDRATE; payload: HydratePayload },
): IUserState => {
	switch (action.type) {
		case HYDRATE:
			return { ...state, ...action.payload.user };

		case userActionTypes.LOG_IN_REQUEST:
			return {
				...state,
				logInLoading: true,
				logInDone: false,
				logInError: null,
			};
		case userActionTypes.LOG_IN_SUCCESS:
			return {
				...state,
				logInLoading: false,
				logInDone: true,
				// me: dummyUser(action.data),
				me: action.data,
			};

		case userActionTypes.LOG_IN_FAILURE:
			return {
				...state,
				logInLoading: false,
				logInError: action.error,
			};

		case userActionTypes.POST_LIKE_REQUEST:
			return {
				...state,
				postLikeLoading: true,
				postLikeDone: false,
				matchDone: false,
				postLikeError: null,
			};
		case userActionTypes.POST_LIKE_SUCCESS:
			return {
				...state,
				postLikeLoading: false,
				postLikeDone: true,
				matchDone: false,
				me: {
					...state.me,
					pet: {
						...state.me?.pet,
						like: [...state.me?.pet?.like, action.data], //그래서 일단 썪쎾쓰 되면  like에 들어가긴해요
					},
				},
				// me : action.data
			};

		case userActionTypes.MATCH_SUCCESS:
			return {
				...state,
				postLikeLoading: false,
				postLikeDone: true,
				matchDone: true,
				me: {
					...state.me,
					pet: {
						...state.me?.pet,
						matchedId: [...state.me?.pet?.matchedId, action.data],
					},
				},
			};

		case userActionTypes.POST_LIKE_FAILURE:
			return {
				...state,
				postLikeLoading: false,
				postLikeError: action.error,
			};

		case userActionTypes.DELETE_USER_REQUEST:
			return {
				...state,
				deleteUserLoading: true,
				deleteUserDone: false,
				deleteUserError: null,
			};

		case userActionTypes.DELETE_USER_SUCCESS:
			return {
				...state,
				deleteUserLoading: false,
				deleteUserDone: true,
				me: null,
			};

		case userActionTypes.DELETE_USER_FAILURE:
			return {
				...state,
				deleteUserLoading: false,
				deleteUserDone: true,
				deleteUserError: action.error,
			};

		case userActionTypes.LOAD_MYPROFILE_REQUEST:
			return {
				...state,
				loadProfileLoading: true,
				loadProfileDone: false,
				loadProfileError: null,
			};
		case userActionTypes.LOAD_MYPROFILE_SUCCESS:
			return {
				...state,
				logInDone: true,
				loadProfileLoading: false,
				loadProfileDone: true,
				me: {
					...state.me,
					email: action?.data?.user?.email,
					name: action?.data?.user?.userName,
					pet: {
						...state.me?.pet,
						petName: action.data?.pet?.petName,
						breed: action.data?.pet?.breed,
						species: action.data?.pet?.species,
						age: action.data?.pet?.age,
						introduce: action.data?.pet?.introduce,
						fileName: action.data?.fileName,
					},
				},
			};
		case userActionTypes.LOAD_MYPROFILE_FAILURE:
			return {
				...state,
				loadProfileDone: false,
				loadProfileError: action.error,
			};

		case userActionTypes.LOAD_CARDS_REQUEST:
			return {
				...state,
				loadCardsLoading: true,
				loadCardsDone: false,
				loadCardsError: null,
			};
		case userActionTypes.LOAD_CARDS_SUCCESS:
			return {
				...state,
				loadCardsLoading: false,
				loadCardsDone: true,
				pets: action.data,
			};
		case userActionTypes.LOAD_CARDS_FAILURE:
			return {
				...state,
				loadCardsDone: false,
				loadCardsError: action.error,
			};

		case userActionTypes.UPDATE_PROFILE_REQUEST:
			return {
				...state,
				updateProfileLoading: true,
				updateProfileDone: false,
				updateProfileError: null,
			};

		case userActionTypes.UPDATE_PROFILE_SUCCESS:
			return {
				...state,
				updateProfileLoading: false,
				updateProfileDone: true,
				// me: action.data,
				me: {
					...state.me,
					email: action.data?.user?.email,
					name: action.data?.user?.name,
					pet: {
						...state.me?.pet,

						petName: action.data?.pet?.petName,
						breed: action.data?.pet?.breed,
						species: action.data?.pet?.species,
						age: action.data?.pet?.age,
						introduce: action.data?.pet?.introduce,

						// action.data.pet?.pet?.dataValues
					},
				},
			};

		case userActionTypes.UPDATE_PROFILE_FAILURE:
			return {
				...state,
				updateProfileLoading: false,
				updateProfileError: action.error,
			};

		case userActionTypes.UPDATE_PETIMAGE_REQUEST:
			return {
				...state,
				updatePetImageLoading: true,
				updatePetImageDone: false,
				updatePetImageError: null,
			};
		case userActionTypes.UPDATE_PETIMAGE_SUCCESS:
			return {
				...state,
				updatePetImageLoading: false,
				updatePetImageDone: true,
				// me: {
				// 	...state.me,
				// 	pet: {
				// 		...state.me?.pet,
				// 		fileName: action.data.data,
				// 	},
				// },
			};
		case userActionTypes.UPDATE_PETIMAGE_FAILURE:
			return {
				...state,
				updatePetImageLoading: false,
				updatePetImageError: action.error,
			};
		case userActionTypes.LOG_OUT_REQUEST:
			return {
				...state,
				logOutLoading: true,
				logOutDone: false,
				logInError: null,
			};

		case userActionTypes.LOG_OUT_SUCCESS:
			return {
				...state,
				logOutLoading: false,
				logOutDone: true,
				me: null,
			};

		case userActionTypes.LOG_OUT_FAILURE:
			return {
				...state,
				logOutLoading: false,
				logOutError: action.error,
			};

		case userActionTypes.SIGN_UP_REQUEST:
			return {
				...state,
				signUpLoading: true,
				signUpDone: false,
				signUpError: null,
			};

		case userActionTypes.SIGN_UP_SUCCESS:
			return {
				...state,
				signUpLoading: false,
				signUpDone: true,
			};

		case userActionTypes.SIGN_UP_FAILURE:
			return {
				...state,
				signUpLoading: false,
				signUpError: action.error,
			};

		case userActionTypes.POST_MATCH_REQUEST:
			return {
				...state,
				postMatchLoading: true,
				postMatchDone: false,
				postMatchError: null,
			};

		case userActionTypes.POST_MATCH_SUCCESS:
			return {
				...state,
				postMatchLoading: false,
				postMatchDone: true,
				matchedPet: {
					...state.matchedPet,
					petId: action.data.matchedPet?.petId,
					petName: action.data.matchedPet?.petName,
					fileName: action.data.matchedPet?.fileName,
				},
			};

		case userActionTypes.POST_MATCH_FAILURE:
			return {
				...state,
				postMatchLoading: false,
				postMatchDone: true,
				postMatchError: action.error,
			};
		default:
			return state;
	}
};

export default reducer;
