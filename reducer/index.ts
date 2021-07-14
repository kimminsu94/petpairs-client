import { RootStateInterface } from './../interface/iRootState';
import { AnyAction, combineReducers, Reducer } from 'redux';
import user from './user';

// export interface State {
// 	user: IUserReducerState;
// }

const rootReducer: Reducer<any, AnyAction> =
	combineReducers<RootStateInterface>({
		user,
	});
export type RootState = ReturnType<typeof rootReducer>; //컴포넌트에 useSelector 타입
export default rootReducer;
