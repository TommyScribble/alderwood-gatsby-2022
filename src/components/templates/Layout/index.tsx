import React, { ReactNode } from 'react';

import * as  styles from './Layout.module.css';
 
type Props = {
	children: ReactNode
}

const Layout = ({children}: Props) => {
 
	return (
		<main className={styles.pageStyles}>
			{children}
		</main>
	);
}
 
export default Layout;