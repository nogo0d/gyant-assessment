import React, { FC, PropsWithChildren } from 'react';
import { Button as MUIButton, CircularProgress } from '@material-ui/core';
import { Lazy } from 'fp-ts/lib/function';

type ButtonProps = PropsWithChildren<{
	isLoading?: boolean;
	onClick: Lazy<void>;
	className?: string;
}>;

export const Button: FC<ButtonProps> = ({ isLoading = false, children, className, onClick }) => (
	<MUIButton className={className} onClick={onClick} variant={'contained'}>
		{isLoading ? <CircularProgress size={20} /> : children}
	</MUIButton>
);
