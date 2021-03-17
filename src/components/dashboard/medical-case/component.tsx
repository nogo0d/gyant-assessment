import React, { FC } from 'react';
import { CircularProgress, Typography } from '@material-ui/core';
import styles from './styles.module.css';

type MedicalCaseProps = {
	isLoading: boolean;
	description: string;
};

export const MedicalCase: FC<MedicalCaseProps> = ({ description, isLoading }) => (
	<div className={styles.container}>
		<Typography>Please Review This Case:</Typography>
		<div className={styles.description}>{isLoading ? <CircularProgress size={20} /> : description}</div>
	</div>
);
