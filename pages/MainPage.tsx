import PetCards from '../components/PetCards';
import styles from '../styles/main.module.scss';
import MainHeader from '../components/MainHeader';
import SwipeButtons from '../components/SwipeButtons';
// import Image from 'next/image';
import Link from 'next/link';
import cat2 from '../images/cat2.jpeg';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { userActionTypes } from '../interface/iUserActType';
import { RootState } from '../reducer';
import wrapper from '../store/configure';
import axios from 'axios';
import { END } from 'redux-saga';

const MainPage = () => {
	// const [pets, setPets] = useState();
	const { me } = useSelector((state: RootState) => state.user);
	const user = useSelector((state: RootState) => state.user);
	const dispatch = useDispatch();
	console.log(me);
	// useEffect(() => {
	// 	// dispatch({
	// 	// 	type: userActionTypes.LOAD_MYPROFILE_REQUEST,
	// 	// });
	// 	dispatch({
	// 		type: userActionTypes.LOAD_CARDS_REQUEST,
	// 	});
	// }, []);
	return (
		<div id={styles.mainContainer}>
			<MainHeader />
			<section className={styles.mainSection}>
				<div className={styles.chatDivision}>
					<div className={styles.profileDiv}>
						<div className={styles.profilePicDiv}>
							{/* <Image
								className={styles.profilePicture}
								src={cat2}
								alt="profilePic"
								width={40}
								height={40}
							/> */}
						</div>

						<Link href="/">
							<a className={styles.profileSpan}>내 프로필</a>
						</Link>
					</div>
				</div>
				<div className={styles.mainDivision}>
					<PetCards />
				</div>
			</section>
		</div>
	);
};

export default MainPage;

export const getServerSideProps = wrapper.getServerSideProps(
	(store) =>
		async (context): Promise<any | null> => {
			console.log('hello ServerSideProps');
			const cookie = context.req ? context.req.headers.cookie : '';
			axios.defaults.headers.cookie = ''; //초기화 <--- 비어주는거
			if (context.req && cookie) {
				console.log(
					'헤더에 쿠키 박아보리기~ 짜릿짜릿해-------------------------------------------------------------------------',
				);
				axios.defaults.headers.Cookie = cookie;
			}
			store.dispatch({
				type: userActionTypes.LOAD_MYPROFILE_REQUEST,
			});

			store.dispatch({
				type: userActionTypes.LOAD_CARDS_REQUEST,
			});
			store.dispatch(END);
			await store.sagaTask.toPromise();
		},
);
