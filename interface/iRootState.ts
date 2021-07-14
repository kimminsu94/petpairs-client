import { IUserState } from './iUser';

export interface RootStateInterface {
	// 리듀서 인덱스파일에 줄 state
	user: IUserState;
}
