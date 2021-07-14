import Head from 'next/head';
import CommonHeader from '../components/CommonHeader';
import CommonFooter from '../components/CommonFooter';
interface LayoutProps {
	children?: React.ReactNode;
	title?: string;
}

const Layout = ({ children, title = '' }: LayoutProps) => {
	return (
		<div className="container">
			<Head>
				<title>{title}</title>
				<meta charSet="utf-8" />
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>
			{/* <CommonHeader /> */}
			{children}
			{/* <CommonFooter /> */}
		</div>
	);
};
export default Layout;
