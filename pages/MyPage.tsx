import {
	GetServerSideProps,
	GetServerSidePropsContext,
	GetServerSidePropsResult,
	InferGetServerSidePropsType,
} from 'next';
import React, {
	useCallback,
	useState,
	useEffect,
	useLayoutEffect,
} from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/myPage.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { IUser, IUserState } from '../interface/iUser';
import { updateProfileData, userActionTypes } from '../interface/iUserActType';
import { RootState } from '../reducer';
import user, { dataSet } from '../reducer/user';
import MyPetImgSlider from '../components/MyPetImgSlider';
import DeleteUserModal from '../components/deleteUserModal';
import CommonHeader from '../components/CommonHeader';
import CommonFooter from '../components/CommonFooter';
import wrapper from '../store/configure';
import axios, { AxiosPromise } from 'axios';
import { END } from 'redux-saga';
import { Context, GetServerSidePropsCallback } from 'next-redux-wrapper';

// InferGetServerSidePropsType<typeof getServerSideProps>)

const MyPage = () => {
	const { me } = useSelector((state: RootState) => state.user);
	const router = useRouter();
	const dispatch = useDispatch();
	const [modalOn, setModalOn] = useState(false);
	const [changeInfoBtnOn, setChangeInfoBtnOn] = useState(false);
	const [changeUserInfoOn, setChangeUserInfoOn] = useState(false);
	const [editPetName, setEditPetName] = useState(false);
	const [editSpecies, setEditSpecies] = useState(false);
	const [editBreed, setEditBreed] = useState(false);
	const [editAge, setEditAge] = useState(false);
	const [editIntroduce, setEditIntroduce] = useState(false);

	const [inputs, setInputs] = useState({
		name: '',
		email: '',
		petName: '',
		species: '',
		breed: '',
		age: undefined,
		introduce: '',
	});

	// useEffect(() => {
	// 	if (!me) {
	// 		router.push('/login');
	// 	}
	// }, [me]);

	const handleModal = useCallback(() => {
		setModalOn(!modalOn);
	}, [modalOn]);

	const isValidEmail = (str: string) => {
		const regExp =
			/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
		return regExp.test(str);
	};

	// useEffect(() => {
	// 	changeInfoOn;
	// }, [changeInfoBtnOn]);
	const changeInfoOn = useCallback(
		(e) => {
			e.preventDefault();
			setChangeInfoBtnOn(true);
			console.log(changeInfoBtnOn);
		},
		[changeInfoBtnOn, setChangeInfoBtnOn],
	);

	const onSubmitUpdatedInfo = useCallback(
		(e) => {
			e.preventDefault();
			console.log(me);

			console.log(changeUserInfoOn);

			if (
				(!me?.name && !inputs.name) ||
				(!me?.email && !inputs.email) ||
				(!me?.pet?.petName && !inputs.petName) ||
				(!me?.pet?.species && !inputs.species) ||
				(!me?.pet?.breed && !inputs.breed) ||
				(!me?.pet?.age && !inputs.age) ||
				(!me?.pet?.introduce && !inputs.introduce)
			) {
				window.alert('누락된 정보가 있어요!');
			} else if (
				inputs.species !== '냥이' &&
				inputs.species !== '멍멍이' &&
				me?.pet?.species !== '냥이' &&
				me?.pet?.species !== '멍멍이'
			) {
				window.alert('냥이 또는 멍멍이로 명시해주세요!');
			} else if (inputs.email && !isValidEmail(inputs.email)) {
				window.alert('올바른 이메일 형태가 아닙니다');

				// else if (!me?.pet?.fileName) {
				// 	window.alert('펫 사진이 필요해요!');
			} else {
				dispatch({
					type: userActionTypes.UPDATE_PROFILE_REQUEST,
					data: {
						id: me?.id,
						name: inputs.name,
						email: inputs.email,
						pet: {
							petId: me?.pet?.petId,
							petName: inputs.petName,
							species: inputs.species,
							breed: inputs.breed,
							age: inputs.age,
							introduce: inputs.introduce,
							// fileName: me?.pet?.fileName,
						},
					},
				});
				// console.log(changeUserInfoOn);
				// console.log(updateProfileDone);

				window.alert('프로필이 수정 되었습니다!');
				console.log(me);
				// router.reload();
				setChangeInfoBtnOn(false);
				setChangeUserInfoOn(false);
				setEditPetName(false);
				setEditSpecies(false);
				setEditBreed(false);
				setEditAge(false);
				setEditIntroduce(false);
				// router.reload();
				// router.replace(router.asPath); // server-side props refresh
			}

			// if (updateProfileError) {
			// 	window.alert('에러 발생!');
			// }
		},
		[
			// updateProfileDone,
			inputs.name,
			inputs.email,
			inputs.petName,
			inputs.species,
			inputs.breed,
			inputs.age,
			inputs.introduce,
			// me?.name,
			// me?.email,
			// me?.pet?.petName,
			// me?.pet?.age,
			// me?.pet?.breed,
			// me?.pet?.introduce,
			// me?.pet?.fileName,
		],
	);

	const onEditInfo = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		setInputs({
			...inputs,
			[e.target.name]: e.target.value,
		});

		console.log(inputs);
	};

	// if (!me) {
	//   return <div>Loading...</div>
	// }
	useEffect(() => {
		// function loadProfile() {
		// 	const promise = axios.get('http://localhost4000/user/userInfo');
		// 	const data = promise.then((res) => res.data);
		// 	return data;
		// }
		// loadProfile().then((data) => console.log(data));

		dispatch({
			type: userActionTypes.LOAD_MYPROFILE_REQUEST,
		});
		// dispatch({
		// 	type: userActionTypes.LOAD_CARDS_REQUEST,
		// });
	}, [dispatch]);
	return (
		<>
			<CommonHeader />

			<div className={styles.bodyContainer}>
				<>
					<section className={styles.bodyWhole}>
						{modalOn && <DeleteUserModal handleModal={handleModal} />}

						<div className={styles.upperBodyContainer}>
							<div className={styles.slider}>
								<MyPetImgSlider />
							</div>
						</div>
						{!changeInfoBtnOn ? ( //  프로필 수정 누르지 않은 상태
							// <section className={styles.bodyWhole}>
							// 	{modalOn && <DeleteUserModal handleModal={handleModal} />}

							// 	<div className={styles.upperBodyContainer}>
							// 		<div className={styles.slider}>
							// 			<MyPetImgSlider />
							// 		</div>
							// 	</div>

							<div className={styles.lowerBodyContainer}>
								{console.log(me)}
								{console.log(me?.user)}
								<div
									className={styles.userPetInfo}
									// style={{ paddingRight: '50px' }}
								>
									<div
										className={styles.userInfo}
										style={{ border: '2rem, solid, black' }}
									>
										<div>{me?.data?.userName || me?.name}</div>
										<div>{me?.data?.email}</div>
									</div>
									<div className={styles.petInfo}>
										{me?.pet?.petName ? (
											<div>펫 이름: {me?.pet?.petName}</div>
										) : (
											<div style={{ color: 'red' }}>펫 이름:</div>
										)}
										{me?.pet?.species ? (
											<div>펫의 종: {me?.pet?.species}</div>
										) : (
											<div style={{ color: 'red' }}>
												펫의 종: 냥이 or 멍멍이
											</div>
										)}
										{me?.pet?.breed ? (
											<div>펫의 품종: {me?.pet?.breed}</div>
										) : (
											<div style={{ color: 'red' }}>
												펫의 품종: 보스턴 테리어, 페르시안 등
											</div>
										)}
										{me?.pet?.age?.toString() ? (
											<div>펫 나이: {me?.pet?.age.toString()}</div>
										) : (
											<div style={{ color: 'red' }}>펫 나이: </div>
										)}
										<div className={styles.introduceBox}>
											{me?.pet?.introduce ? (
												<div className={styles.introduce}>
													펫 소개: {me?.pet?.introduce}
												</div>
											) : (
												<div
													className={styles.introduce}
													style={{ color: 'red' }}
												>
													펫 소개: ffdsadaffdsfffdsadaffdsfssffdsa
												</div>
											)}
										</div>
									</div>
									<button
										className={styles.editInfoBtn}
										type="button"
										onClick={changeInfoOn}
									>
										프로필 수정
									</button>
									<button
										className={styles.deleteUserBtn}
										onClick={handleModal}
									>
										회원 탈퇴
									</button>
								</div>
							</div>
						) : (
							// </section>
							// 프로필 수정 누른 상태
							// <section className={styles.bodyWhole}>
							// 	<div className={styles.upperBodyContainer}>
							// 		<div className={styles.slider}>
							// 			<MyPetImgSlider />
							// 		</div>
							// 	</div>

							<div className={styles.lowerBodyContainer}>
								<div className={styles.editUserPetInfo}>
									{changeUserInfoOn === false ? ( // 유저 정보 수정 누르지 않은 상태
										<button
											// style={{ width: '40px' }}
											onClick={() => {
												setChangeUserInfoOn(true);
												console.log('머선129');
											}}
										>
											유저정보 수정
										</button>
									) : (
										// 유저 정보 누른 상태
										<div className={styles.userInfoEdit}>
											<input
												id={styles.name}
												name="name"
												placeholder={`이름: ${me?.userName || me?.name}`}
												value={inputs.name}
												onChange={onEditInfo}
											/>
											<input
												id={styles.email}
												name="email"
												type="text"
												placeholder={`이메일: ${me?.email}`}
												value={inputs.email}
												onChange={onEditInfo}
											/>
										</div>
									)}
									<div className={styles.petInfoEdit}>
										{editPetName ? (
											<input
												id={styles.petName}
												name="petName"
												type="text"
												placeholder={
													me?.pet?.petName
														? `펫의 이름: ${me?.pet?.petName}`
														: '펫의 이름을 입력해주세요'
												}
												value={inputs.petName}
												onChange={onEditInfo}
											/>
										) : (
											<div className={styles.editPetName}>
												<button
													style={{ width: '60px' }}
													onClick={() => {
														setEditPetName(true);
														console.log(editPetName);
													}}
												>
													펫 이름
												</button>
												{me?.pet?.petName ? (
													<div className={styles.name}>{me?.pet?.petName}</div>
												) : (
													<div className={styles.name} style={{ color: 'red' }}>
														펫 이름:
													</div>
												)}
											</div>
										)}
										{editSpecies ? (
											<input
												id={styles.species}
												name="species"
												type="text"
												placeholder={
													me?.pet?.species
														? `펫의 종: ${me?.pet?.species}`
														: '펫의 종을 입력해주세요'
												}
												value={inputs.species}
												onChange={onEditInfo}
											/>
										) : (
											<div className={styles.editSpecies}>
												<button
													style={{ width: '60px' }}
													onClick={() => {
														setEditSpecies(true);
													}}
												>
													펫의 종
												</button>
												{me?.pet?.species ? (
													<div className={styles.petSpecies}>
														{me?.pet?.species}
													</div>
												) : (
													<div
														className={styles.petSpecies}
														style={{ color: 'red' }}
													>
														펫의 종: 냥이 or 멍멍이
													</div>
												)}
											</div>
										)}
										{editBreed ? (
											<input
												id={styles.breed}
												name="breed"
												type="text"
												placeholder={
													me?.pet?.breed
														? `펫의 품종: ${me?.pet?.breed}`
														: '펫의 품종을 입력해주세요'
												}
												value={inputs.breed}
												onChange={onEditInfo}
											/>
										) : (
											<div className={styles.editBreed}>
												<button
													style={{ width: '60px' }}
													onClick={() => {
														setEditBreed(true);
													}}
												>
													펫의 품종
												</button>
												{me?.pet?.breed ? (
													<div className={styles.petBreed}>
														{me?.pet?.breed}
													</div>
												) : (
													<div
														className={styles.petBreed}
														style={{ color: 'red' }}
													>
														펫의 품종: 보스턴 테리어, 페르시안 등
													</div>
												)}
											</div>
										)}
										{editAge ? (
											<input
												id={styles.age}
												name="age"
												type="number"
												placeholder={
													me?.pet?.age?.toString()
														? `펫 나이: ${me?.pet?.age.toString()}`
														: '펫의 나이을 입력해주세요'
												}
												value={inputs.age}
												onChange={onEditInfo}
											/>
										) : (
											<div className={styles.editAge}>
												<button
													style={{ width: '60px' }}
													onClick={() => {
														setEditAge(true);
													}}
												>
													펫의 나이
												</button>
												{me?.pet?.age ? (
													<div className={styles.petAge}>{me?.pet?.age}</div>
												) : (
													<div
														className={styles.petAge}
														style={{ color: 'red' }}
													>
														펫 나이:
													</div>
												)}
											</div>
										)}
									</div>

									{editIntroduce ? (
										<textarea
											id={styles.introduce}
											name="introduce"
											placeholder={
												me?.pet?.introduce
													? `펫 소개: ${me?.pet?.introduce}`
													: '펫을 소개해주세요'
											}
											value={inputs.introduce}
											onChange={onEditInfo}
										/>
									) : (
										<div className={styles.editIntroduce}>
											<button
												style={{ width: '60px' }}
												onClick={() => {
													setEditIntroduce(true);
												}}
											>
												펫 소개
											</button>
											{me?.pet?.introduce ? (
												<div className={styles.petIntroduce}>
													{me?.pet?.introduce}
												</div>
											) : (
												<div
													className={styles.petIntroduce}
													style={{ color: 'red' }}
												>
													펫 소개:
												</div>
											)}
										</div>
									)}
								</div>
								<div className={styles.onEditBtns}>
									<button className="submitBtn" onClick={onSubmitUpdatedInfo}>
										수정 완료
									</button>
									<button
										className={styles.cancelEditProfile}
										type="button"
										onClick={() => router.reload()}
									>
										취소
									</button>
								</div>
							</div>
							// </section>
						)}
					</section>
				</>
			</div>
			<CommonFooter />
		</>
	);
};

// export const getServerSideProps = wrapper.getServerSideProps(
//  ({ store, req, res, ...etc }) => {
// 		const cookie = req ? req.headers.cookie : '';
// 		if (cookie) {
// 			axios.defaults.headers.common.Authorization = `Bearer ${cookie}`;
// 			// store.dispatch(ApplicationSlice.actions.updateConfiguration());
// 			store.dispatch({ type: userActionTypes.LOAD_MYPROFILE_REQUEST });
// 			store.dispatch({ type: userActionTypes.LOAD_CARDS_REQUEST });
// 		}
// 		store.dispatch(END);
// 		store.sagaTask.toPromise();
// 	},
// );
// export const getServerSideProps: GetServerSideProps = async (context) => {

// export const getServerSideProps: GetServerSideProps =
// 	wrapper.getServerSideProps(async (ctx) => {
// 		// get the cookies
// 		const cookieString = ctx.req ? ctx.req.headers.cookie : '';

// 		// set the cookies
// 		ctx.res.setHeader('set-Cookie', 'foo=bar; HttpOnly');
// 		return {
// 			props: {},
// 		};
// 	});

// export const getServerSideProps = wrapper.getServerSideProps(
// 	(store) =>
// 		async (context): Promise<any | null> => {
// 			console.log('hello ServerSideProps');
// 			const cookie = context.req ? context.req.headers.cookie : '';
// 			axios.defaults.headers.Cookie = ''; //초기화 <--- 비어주는거
// 			console.log(
// 				'헤더에 쿠키 박아보렸나?~ 짜릿짜릿해-------------------------------------------------------------------------',
// 				context.req.headers,
// 			);
// 			if (context.req && cookie) {
// 				console.log(
// 					'헤더에 쿠키 박아보리기~ 짜릿짜릿해-------------------------------------------------------------------------',
// 				);
// 				axios.defaults.headers.Cookie = cookie;
// 			}
// 			await store.dispatch({
// 				type: userActionTypes.LOAD_MYPROFILE_REQUEST,
// 			});
// 			store.dispatch(END);
// 			await store.sagaTask?.toPromise();
// 		},
// );

// export const getServerSideProps =
// 	wrapper.getServerSideProps(async (context): Promise<any> => {
// 		const cookies = nookies.get(context);
// 		if (cookies.userId && cookies.token) {
// 			context.store.dispatch(
// 				{ type: userActionTypes.LOAD_MYPROFILE_REQUEST },
// 				cookies.userId,
// 			);
// 			context.store.dispatch(
// 				{ type: userActionTypes.LOAD_CARDS_REQUEST },
// 				cookies.userId,
// 				cookies.token,
// 			);
// 			context.store.dispatch(END);
// 			await context.store.sagaTask?.toPromise();
// 		} else {
// 			return {
// 				props: { ...cookies },
// 			};
// 		}
// 	});
// 	return {
// 		redirect: {
// 			permanent: false,
// 			destination: '/user/signin',
// 		},
// 	};
// }

// export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(async (context) => {
// const cookie = context.req ? context.req.headers.cookie : '';
//   if (cookie) {
//     axios.defaults.headers.common.Authorization = `Bearer ${cookie}`;
//     context.store.dispatch({ type: userActionTypes.LOAD_MYPROFILE_REQUEST });
//     context.store.dispatch({ type: userActionTypes.LOAD_CARDS_REQUEST});
//   }
// }
// context.store.dispatch(END);
// await context.store.sagaTask.toPromise();
// return {
//   props: {
//     me
//   }
// }

// export const getServerSideProps = wrapper.getServerSideProps(async (context) => {

//   return {
//     props: {
//       me
//     }
//   }
// }

export default MyPage;
