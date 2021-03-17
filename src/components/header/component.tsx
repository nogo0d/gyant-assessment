import React, { FC } from 'react';
import { option } from 'fp-ts';
import { constNull, Lazy } from 'fp-ts/lib/function';
import { pipe } from 'fp-ts/lib/pipeable';
import { Typography } from '@material-ui/core';
import { User } from '../../models/user';
import { Button } from '../ui-kit/button/component';
import styles from './styles.module.css';

type HeaderProps = {
	isLoading: boolean;
	user: option.Option<User>;
	onLogout: Lazy<void>;
};

export const Header: FC<HeaderProps> = ({ isLoading, user, onLogout }) => {
	const welcomeMessage = pipe(
		user,
		option.fold(constNull, ({ name }) => (
			<span className={styles.welcomeMessage}>
				<Typography>Logged in as: {name}</Typography>
			</span>
		)),
	);
	const logoutButton = pipe(
		user,
		option.fold(constNull, () => (
			<Button isLoading={isLoading} onClick={onLogout}>
				Log Out
			</Button>
		)),
	);
	const emptyMessage = pipe(
		user,
		option.fold(
			() => (
				<span className={styles.emptyMessage}>
					<Typography>You must login before start working</Typography>
				</span>
			),
			constNull,
		),
	);

	return (
		<header className={styles.container}>
			{emptyMessage}
			{welcomeMessage}
			{logoutButton}
		</header>
	);
};
