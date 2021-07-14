import styles from '../styles/landingSection3.module.scss';

const Section3 = () => {

	return (
		<div className={styles.section3}>
			<h1>PETPAIRS 이용 후기</h1>
			<div className={styles.container}>
				<div className={styles.review}>
					<h3>냥냥이 주인</h3>
						<p>저희 냥냥이에게 좋은 친구가 생긴거 같아 너무 좋았어요!</p>
				</div>
				<div className={styles.review}>
					<h3>멍멍이 주인</h3>
						<p>산책할때마다 새로운 친구들과 함께 할 수 있어 재미있어요~</p>
				</div>
				<div className={styles.review}>
					<h3>웰코 주인</h3>
						<p>주위에 새로운 애완견들을 볼수 있어 항상 기대가 됩니당</p>
					</div>
			</div>
		</div>
	);
};
export default Section3;
