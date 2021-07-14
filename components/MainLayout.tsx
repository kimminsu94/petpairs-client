import Head from 'next/head';
import PersonIcon from '@material-ui/icons/Person';
import ChatIcon from '@material-ui/icons/Chat';
import { IconButton } from '@material-ui/core';
import styles from '../styles/main.module.scss';
import Image from 'next/image';
// import mainLogo from '../images/unknown.png';

interface LayoutProps {
	children?: React.ReactNode;
	title?: string;
}

const MainLayout = ({ children, title = '' }: LayoutProps) => {
	return (
		<>
			<div className="container">
				<Head>
					<title>{title}</title>
				</Head>
				<header className={styles.header}>
					<IconButton>
						<PersonIcon className={styles.header__icon} fontSize="large" />
					</IconButton>

					{/* <Image src={mainLogo} alt="headerIMG" width={70} height={70} /> */}
					<IconButton>
						<ChatIcon className={styles.header__icon} fontSize="large" />
					</IconButton>
				</header>
			</div>
			{children}
		</>
	);
};
export default MainLayout;
