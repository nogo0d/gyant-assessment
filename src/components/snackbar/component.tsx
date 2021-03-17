import React, { FC, Fragment } from 'react';
import { Alert } from '@material-ui/lab';
import { Snackbar as MUISnackbar } from '@material-ui/core';
import { constNull, Lazy } from 'fp-ts/lib/function';
import { option } from 'fp-ts';
import { pipe } from 'fp-ts/lib/pipeable';
import { Message } from './model';

type SnackbarProps = {
	message: option.Option<Message>;
	isOpen: boolean;
	onClose: Lazy<void>;
};

export const Snackbar: FC<SnackbarProps> = ({ isOpen, message, onClose }) => (
	<MUISnackbar open={isOpen} autoHideDuration={10000}>
		<Fragment>
			{pipe(
				message,
				option.fold(constNull, ({ value, type }) => (
					<Alert onClose={onClose} severity={type}>
						{value}
					</Alert>
				)),
			)}
			<div />
		</Fragment>
	</MUISnackbar>
);
