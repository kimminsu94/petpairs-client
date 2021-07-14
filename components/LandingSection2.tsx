/* eslint-disable react/no-unescaped-entities */
import styles from '../styles/landingSection2.module.scss';
import FavoriteIcon from '@material-ui/icons/Favorite';
import CloseIcon from '@material-ui/icons/Close';
import { IconButton } from '@material-ui/core';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import React from 'react';
import { useMemo } from 'react';
import { useEffect } from 'react';
import Image from 'next/image';
import { useCallback } from 'react';
import { style, width } from '@material-ui/system';

// const alreadyRemoved = [];
// let petState = db;
const Section2 = () => {
	// const [pets, setPets] = useState(db);
	const dispatch = useDispatch();
	const [time, setTime] = useState('');
	const [current, setCurrent] = useState(0);

	const db = [
		{
			id: 2,
			petName: '사슴이된성민G',
			age: 88,
			breed: '시츄',
			species: ['강아지'],
			fileName:
				'https://images.pexels.com/photos/7853223/pexels-photo-7853223.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
			matchedId: [5],
		},
		{
			id: 3,
			petName: '혼란을틈탄여자',
			age: 82,
			breed: '고양이',
			species: ['고양이'],
			fileName:
				'https://images.pexels.com/photos/5428550/pexels-photo-5428550.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
			matchedId: [1],
		},
		{
			id: 4,
			petName: '강아지가된엄호태',
			age: 818,
			breed: '시츄',
			species: ['강아지'],
			fileName:
				'https://images.pexels.com/photos/7098011/pexels-photo-7098011.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
			matchedId: [1],
		},
	];

	const length = db.length;

	const prevSlide = useCallback(
		(e) => {
			if (length !== undefined) {
				setCurrent(current === 0 ? length - 1 : current - 1);
			}
		},
		[length, current],
	);

	const nextSlide = useCallback(
		(e) => {
			if (length !== undefined) {
				setCurrent(current === length - 1 ? 0 : current + 1);
			}
		},
		[length, current],
	);

	const landom = () => {};

	const currentTime = () => {
		var hours: any = new Date().getHours();
		var min: any = new Date().getMinutes();
		setTime(`${hours}` + ':' + `${min}`);
	};

	useEffect(() => {
		currentTime();
		return () => {
			currentTime();
		};
	}, []);

	return (
		<div className={styles.section2}>
			<div className={styles.phone}>
				<div className={styles.app}>
					<div className={styles.head}>
						<div className={styles.top}>
							<span className={styles.left}>PETPAIRS</span>
							<span className={styles.center}>{time}</span>
							<span className={styles.right}>
								<span>75%</span>
								<div className={styles.battery}></div>
							</span>
						</div>
					</div>
					<div className={styles.sonar}>
						<div className={styles.slideHolder}>
							<div className={styles.petsContainer}>
								{db.map((dbItem: any, index: React.Key | null | undefined) => {
									return (
										<div
											className={index === current ? 'active slide' : 'slide'}
											key={index}
										>
											{index === current && (
												<div
													className={styles.pets}
													style={{ backgroundImage: `url(${dbItem.fileName})` }}
												></div>
											)}
										</div>
									);
								})}
							</div>
						</div>
					</div>
					<div className={styles.swipeButtonContainer}>
						<IconButton className={styles.buttonBox}>
							<CloseIcon
								className={styles.buttonIcon}
								color="primary"
								onClick={prevSlide}
							/>
						</IconButton>
						<IconButton className={styles.buttonBox}>
							<FavoriteIcon
								className={styles.buttonIcon}
								color="secondary"
								onClick={nextSlide}
							/>
						</IconButton>
					</div>
				</div>
			</div>
			<p>내 애완동물에게 좋은 친구를 발견해주세요</p>
		</div>
	);
};
export default Section2;
