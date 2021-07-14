import Link from 'next/link';
import Router from 'next/router';
import Image from 'next/image';
import CatDog from '../images/catdog.png';
import { StylesProvider } from '@material-ui/styles';
import { useCallback, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userActionTypes } from '../interface/iUserActType';
import { RootState } from '../reducer/index';
import styles from '../styles/landingSection1.module.scss';

const Section1 = () => {
	const { me } = useSelector((state: RootState) => state.user);
	const dispatch = useDispatch();

	const MainPage = useCallback(() => {
		Router.replace('/MainPage');
	}, []);

	return (
		<div className={styles.section1}>
			<div className={styles.section}>
				{/* <Image className={styles.imageCatDog} src={CatDog} width={450} height={300}/> */}
			</div>
			<div className={styles.sectionText}>
				<h1>
					<span className={styles.text}>P</span>
					<span className={styles.text}>E</span>
					<span className={styles.text}>T</span>
					<span className={styles.text}>P</span>
					<span className={styles.text}>A</span>
					<span className={styles.text}>I</span>
					<span className={styles.text}>R</span>
					<span className={styles.text}>S</span>
				</h1>
			</div>
		</div>
	);
};

export default Section1;
