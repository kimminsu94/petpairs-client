import { StylesProvider } from '@material-ui/core';
import React, { useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../reducer';
import Image from 'next/image';
// import mainLogo from '../images/unknown.png';
import styles from '../styles/deleteUserModal.module.scss';
import { userActionTypes } from '../interface/iUserActType';

interface ChildProps {
	handleModal: () => void;
}

const DeleteUserModal: React.FC<ChildProps> = (props) => {
	// const [inputs, setInputs] = useState({
	//   email: '',
	//   password: '',
	// })
	// const { me } = useSelector((state: RootState) => state.user)
	const { me, deleteUserDone, deleteUserError } = useSelector(
		(state: RootState) => state.user,
	);
	const router = useRouter();
	const dispatch = useDispatch();
	// const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
	//   setInputs({ ...inputs, [e.target.name]: e.target.value });
	//   console.log(inputs);
	// }

	const handleSubmit = useCallback(
		(e) => {
			e.preventDefault();
			if (me) {
				dispatch({
					type: userActionTypes.DELETE_USER_REQUEST,
					id: me?.id,
				});

				window.alert('정상적으로 탈퇴되었습니다');
				router.push('/');
			}
			if (deleteUserError !== null) {
				window.alert('오류로 인해 탈퇴처리가 안됬습니다');
				router.reload();
			}
		},
		[dispatch, deleteUserDone, deleteUserError],
	);

	return (
		<div className={styles.delUserModal} onClick={props.handleModal}>
			<div
				className={styles.delUserModalOuter}
				onClick={(e) => {
					e.stopPropagation();
				}}
			>
				<span className={styles.modalClose} onClick={props.handleModal}>
					&times;
				</span>
				<div className={styles.delUserModalContents}>
					<div className={styles.logoImage}>
						{/* <Image
							src={mainLogo}
							alt="logoIMG"
							width={80}
							height={80}
							objectFit="none"
						/> */}
					</div>
					<p className={styles.alertNote} style={{ color: '#61BFAD' }}>
						탈퇴 시 회원님의 모든 정보는 영구적으로 삭제됨을 알려드립니다!{' '}
					</p>
					<p className={styles.alertMessage}>탈퇴 하시겠습니까?</p>
					<div className={styles.delUserBtns}>
						<button
							className={styles.submitDelBtn}
							type="submit"
							onClick={handleSubmit}
						>
							탈퇴
						</button>
						<button
							className={styles.cancelDelBtn}
							type="button"
							onClick={() => router.reload()}
						>
							취소
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DeleteUserModal;
