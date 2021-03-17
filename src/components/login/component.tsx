import React, { FC } from 'react';
import { Effect } from '../../utils/functions';
import { Button } from '../ui-kit/button/component';
import styles from './style.module.css';

type LoginProps = {
	isLoading: boolean;
	onLogin: Effect<void>;
};

export const Login: FC<LoginProps> = ({ isLoading, onLogin }) => (
	<div className={styles.container}>
		<Button isLoading={isLoading} onClick={onLogin}>
			Login
		</Button>
	</div>
);
