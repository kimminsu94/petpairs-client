import React, { ChangeEvent, useCallback, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
// import mainLogo from '../images/unknown.png';
import LoginModal from './LoginModal';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../reducer';
import { userActionTypes } from '../interface/iUserActType';
import styles from '../styles/signUpModal.module.scss';
import { InputSharp } from '@material-ui/icons';

interface ChildProps {
	handleShowModal: () => void;
}

const SignupModal: React.FC<ChildProps> = (props) => {
	const dispatch = useDispatch();
	const { me, signUpDone, signUpLoading } = useSelector(
		(state: RootState) => state.user,
	);
	const [isOpen, setIsOpen] = useState(false);
	const [error, setError] = useState('');
	const [input, setInput] = useState({
		name: '',
		email: '',
		password: '',
	});

	const isValidEmail = (str: string) => {
		const regExp =
			/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
		return regExp.test(str);
	};

	const isValidPw = (str: string) => {
		const regExp =
			/^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/i;
		return regExp.test(str);
	};

	const handleModal = useCallback(() => {
		setIsOpen(!isOpen);
		console.log('나와라제바알~~~');
	}, [isOpen]);

	const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
		const {
			target: { name, value },
		} = e;
		console.log(e.target.name);
		console.log(e.target.value);
		setInput({
			...input,
			[name]: value,
		});
	};

	const submitHandler = useCallback(
		(e) => {
			console.log('작동되니?');
			e.preventDefault();
			if (!isValidEmail(input.email) || !isValidPw(input.password)) {
				setError('올바른 정보를 입력해주세요');
			} else {
				dispatch({
					type: userActionTypes.SIGN_UP_REQUEST,
					data: {
						name: input.name,
						email: input.email,
						password: input.password,
					},
				});
			}
		},
		[dispatch, input.name, input.email, input.password],
	);

	return (
		<>
			<div className={styles.modal} onClick={props.handleShowModal}>
				<div
					onClick={(e) => {
						e.stopPropagation();
					}}
				>
					<div className={styles.signupModal}>
						<span className={styles.close} onClick={props.handleShowModal}>
							&times;
						</span>
						<div className={styles.modalContents}>
							{/* <Image
								className={styles.signinIcon}
								src={mainLogo}
								alt="headerIMG"
								width={80}
								height={80}
								objectFit="none"
							/> */}
							<input
								name="name"
								className={styles.signupName}
								type="text"
								placeholder="이름"
								onChange={inputChangeHandler}
							/>
							<input
								name="email"
								className={styles.signupId}
								type="text"
								placeholder="아이디"
								onChange={inputChangeHandler}
							/>
							<input
								name="password"
								className={styles.signupPw}
								type="password"
								placeholder="비밀번호"
								onChange={inputChangeHandler}
							/>
							<div className={styles.signupMid}>
								<button className={styles.signupBtn} onClick={submitHandler}>
									{' '}
									회원가입{' '}
								</button>
								<div className={styles.signupEnd}>
									<div className={styles.signupLine}>
										새로운 친구들을 찾아볼까요?
										<>
											{isOpen && <LoginModal handleModal={handleModal} />}
											<button
												className={styles.loginButton}
												onClick={handleModal}
											>
												로그인
											</button>
										</>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default SignupModal;
