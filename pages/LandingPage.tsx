import React, { useCallback, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userActionTypes } from '../interface/iUserActType';
import { RootState } from '../reducer/index';
import wrapper from '../store/configure';
import CommonHeader from '../components/CommonHeader';
import styles from '../styles/layout.module.scss';
import Section1 from '../components/LandingSection1';
import Section2 from '../components/LandingSection2';
import Section3 from '../components/LandingSection3';
import Link from 'next/link';
import Image from 'next/image';
import CommonFooter from '../components/CommonFooter';

const LandingPage = () => {
	const { me } = useSelector((state: RootState) => state.user);
	const dispatch = useDispatch();

	// useEffect(() => {
	// 	dispatch({
	// 		type: userActionTypes.LOAD_MYPROFILE_REQUEST,
	// 	});
	// }, [dispatch]);
	return (
		<div className="container">
			<CommonHeader />
			<Section1 />
			<Section2 />
			<Section3 />
			<CommonFooter />
		</div>
	);
};

export default LandingPage;
