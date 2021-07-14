import { createWrapper, MakeStore, Context } from 'next-redux-wrapper';
import {
	applyMiddleware,
	compose,
	createStore,
	Store,
	AnyAction,
	Middleware,
	StoreEnhancer,
} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware, { Task } from 'redux-saga';
import { IUserState } from '../interface/iUser';
import rootReducer, { RootState } from '../reducer';
import rootSaga from '../sagas';

export interface SagaStore extends Store {
	sagaTask?: Task;
}

const configureStore: MakeStore<RootState> = () => {
	const sagaMiddleware = createSagaMiddleware();
	const middlewares = [sagaMiddleware];
	const enhancer =
		process.env.NODE_ENV === 'production'
			? compose(applyMiddleware(...middlewares)) //배포용 미들웨어
			: composeWithDevTools(applyMiddleware(...middlewares)); // 개발용 미들웨어
	const store = createStore(rootReducer, enhancer);
	(store as SagaStore).sagaTask = sagaMiddleware.run(rootSaga);
	return store;
};

const wrapper = createWrapper<RootState>(configureStore, {
	debug: process.env.NODE_ENV === 'development', // true일 때 디버그가 더 자세히 뜹니다.
});

export default wrapper;

// const configureStore = () => {
// 	const sagaMiddleware = createSagaMiddleware();
// 	const middlewares = [sagaMiddleware];
// 	const enhancer =
// 		process.env.NODE_ENV === 'production'
// 			? compose(applyMiddleware(...middlewares)) //배포용 미들웨어
// 			: composeWithDevTools(applyMiddleware(...middlewares)); // 개발용 미들웨어
// 	const store = createStore(rootReducer, enhancer);
// 	store.sagaTask = sagaMiddleware.run(rootSaga);
// 	return store;
// };
