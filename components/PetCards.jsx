import React, { useState, useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TinderCard from 'react-tinder-card';
import { userActionTypes } from '../interface/iUserActType';
import styles from '../styles/card.module.scss';
import SwipeButtons from './SwipeButtons';
const db = [
	{
		id: 40,
		petName: '사슴이된성민G',
		age: 88,
		breed: '시츄',
		species: ['강아지'],
		fileName:
			'https://images.pexels.com/photos/7853223/pexels-photo-7853223.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
		matchedId: [5],
	},
	{
		id: 41,
		petName: '혼란을틈탄여자',
		age: 82,
		breed: '고양이',
		species: ['고양이'],
		fileName:
			'https://images.pexels.com/photos/5428550/pexels-photo-5428550.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
		matchedId: [1],
	},
	{
		id: 42,
		petName: '강아지가된엄호태',
		age: 818,
		breed: '시츄',
		species: ['강아지'],
		fileName:
			'https://images.pexels.com/photos/7098011/pexels-photo-7098011.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
		matchedId: [1],
	},
];

const alreadyRemoved = [];
let petState = db;
const PetCards = () => {
	const [pets, setPets] = useState([]);
	const dispatch = useDispatch();
	const userReducer = useSelector((state) => state.user);
	const childRefs = useMemo(
		() =>
			Array(pets.length)
				.fill(0)
				.map((i) => React.createRef()),
		[],
	);

	const swiped = (dir, nameToDelete, id) => {
		if (dir === 'left') {
			console.log(`you swiped to ${dir} and removed ${nameToDelete}`);
			alreadyRemoved.push(nameToDelete);
			console.log(alreadyRemoved);
		}
		if (dir === 'right') {
			dispatch({
				type: userActionTypes.POST_LIKE_REQUEST,
				data: { otherPetId: id },
			});
			console.log(`you swiped to ${dir} and removed ${nameToDelete}`);
			alreadyRemoved.push(nameToDelete);
			console.log(alreadyRemoved);
			console.log(userReducer);
		}
		// 만약 dir이 left이면 => 아무것도 안한다
		// dispatch({
		//
		// })
		// 만약 dir이 right이면 => dispatch Request를 보낸다.
		// 리퀘스트가 성공하면 SUCCESS로 넘어간다.
		// SUCCESS일 때 =>
		// 만약 상대와 나의 좋아요 한 아이디가 같다면 matchedId에 넣는다. (아이디 보내면 서버에서 판단)
		// 아니면 그냥 like에 넣어준다.
	};

	const outOfFrame = (name) => {
		console.log(name + ' left the screen!');
		petState = petState.filter((pet) => pet.petName !== name);
		setPets(petState);
	};

	const swipe = (dir) => {
		const cardsLeft = pets.filter(
			(pet) => !alreadyRemoved.includes(pet.petName),
		);
		if (cardsLeft.length) {
			const toBeRemoved = cardsLeft[cardsLeft.length - 1].petName; // 카드오브젝트 하나 지울거 찾기
			const index = pets.map((pet) => pet.petName).indexOf(toBeRemoved); // Find the index of which to make the reference to
			alreadyRemoved.push(toBeRemoved); // Make sure the next card gets removed next time if this card do not have time to exit the screen
			childRefs[index].current.swipe(dir); // Swipe the card!
		}
		console.log(`workd? ${dir}`);
	};

	useEffect(() => {
		console.log(userReducer.pets);
		setPets(userReducer.pets);
		if (!childRefs) {
			return;
		}
	}, []);
	return (
		<>
			{pets.map((pet, index) => (
				<TinderCard
					ref={childRefs[index]}
					className={styles.swipe}
					key={pet.petName}
					preventSwipe={['up', 'down']}
					onSwipe={(dir) => swiped(dir, pet.petName, pet.petId)}
					onCardLeftScreen={() => outOfFrame(pet.petName)}
				>
					<div
						className={styles.card}
						style={{
							backgroundImage: `url(http://localhost:4000/pet/${pet.fileName})`,
						}}
					>
						<h2>
							{pet.petName} {pet.age}세
						</h2>
						<p>소개글입니다 나는 동물입니다</p>
					</div>
				</TinderCard>
			))}
			<SwipeButtons onSwipe={swipe} />
		</>
	);
};

export default PetCards;
