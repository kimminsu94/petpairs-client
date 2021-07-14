import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';
// import Image from 'next/image';
import React, { useCallback, useState } from 'react';
// import mainLogo from '../images/unknown.png';
import styles from '../styles/commonHeader.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../reducer';
import LoginModal from './LoginModal';
import SignupModal from './SignupModal';
import { userActionTypes } from '../interface/iUserActType';

const CommonHeader = () => {
	const [showModal, setShowModal] = useState(false);
	const [showSignupModal, setSignupShowModal] = useState(false);
	const [isLogin, setIsLogin] = useState(false);
	const { me, logInDone } = useSelector((state: RootState) => state.user);
	const router = useRouter();
	const dispatch = useDispatch();

	const handleModal = useCallback(() => {
		setShowModal((state) => !state);
		console.log('눌렀다아아아아앙');
	}, []);

	const handleShowModal = useCallback(() => {
		setSignupShowModal(!showSignupModal);
		console.log('가입해라');
	}, [showSignupModal]);

	// const onCloseModal = useCallback(() => {
	// 	setShowModal(false);
	// 	console.log('꺼저');
	// }, []);

	const Logout = useCallback(() => {
		dispatch({ type: userActionTypes.LOG_OUT_REQUEST });
		router.reload();
		router.push('/LandingPage');
	}, []);

	const MyPage = useCallback(() => {
		router.push('/MyPage');
	}, []);

	const MainPage = useCallback(() => {
		router.push('/MainPage');
	}, []);

	return (
		<div className={styles.header}>
			<div className={styles.section1}>
				{/* <Link href="/LandingPage" passHref>
					<Image
						className={styles.image}
						src={mainLogo}
						alt="headerImg"
						width={100}
						height={85}
					/>
				</Link> */}
			</div>
			<div className={styles.section2}>
				{!me || !MyPage ? (
					<>
						{showModal && <LoginModal handleModal={handleModal} />}
						<button className={styles.button} onClick={handleModal}>
							LOG IN
						</button>
						{showSignupModal && (
							<SignupModal handleShowModal={handleShowModal} />
						)}
						<button className={styles.button} onClick={handleShowModal}>
							SIGN UP
						</button>
					</>
				) : (
					<>
						<Link href="/MainPage">
							<a
								className={styles.button}
								type="button"
								onClick={() => router.push('/MyPage')}
							>
								메인페이지
							</a>
						</Link>
						<Link href="/MyPage">
							<a className={styles.button}>마이페이지</a>
						</Link>

						<button className={styles.button} onClick={Logout}>
							로그아웃
						</button>
					</>
				)}
			</div>
		</div>
	);
};

export default CommonHeader;
function dispatch(arg0: { type: any }) {
	throw new Error('Function not implemented.');
}
