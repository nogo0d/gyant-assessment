import React, { FC, Fragment } from 'react';
import { option } from 'fp-ts';
import { Lazy } from 'fp-ts/lib/function';
import { pipe } from 'fp-ts/lib/pipeable';
import { CircularProgress, Typography } from '@material-ui/core';
import { isPending, RemoteData } from '@devexperts/remote-data-ts';
import { MedicalCase } from '../../models/hospital';
import { Effect } from '../../utils/functions';
import { Button } from '../ui-kit/button/component';
import { getOrEmptyString } from '../../utils/option';
import { MedicalCondition } from '../../models/medical-condition';
import { MedicalCase as MedicalCaseComponent } from './medical-case/component';
import { MedicalConditionMenu } from './medical-condition-menu/component';
import styles from './styles.module.css';

type DashboardProps = {
	isLoading: boolean;
	isFinished: boolean;
	medicalCase: option.Option<MedicalCase>;
	resetStatus: RemoteData<Error, void>;
	onSelectMedicalConditions: Effect<MedicalCondition[]>;
	onSubmit: Lazy<void>;
	onReset: Lazy<void>;
};

export const Dashboard: FC<DashboardProps> = ({
	medicalCase,
	isLoading,
	isFinished,
	resetStatus,
	onSelectMedicalConditions,
	onSubmit,
	onReset,
}) => (
	<section className={styles.container}>
		{isFinished && (
			<div className={styles.doneMessageContainer}>
				<Typography className={styles.doneMessage}>You are Done</Typography>
				<Button isLoading={isPending(resetStatus)} className={styles.resetButton} onClick={onReset}>
					Untag Cases
				</Button>
			</div>
		)}
		{!isFinished && (
			<Fragment>
				<div className={styles.content}>
					<MedicalCaseComponent
						isLoading={isLoading}
						description={pipe(
							medicalCase,
							option.map(({ description }) => description),
							getOrEmptyString,
						)}
					/>
					{isLoading ? (
						<CircularProgress className={styles.loadingIndicator} size={20} />
					) : (
						<MedicalConditionMenu onChange={onSelectMedicalConditions} />
					)}
				</div>
				<Button className={styles.submitButton} isLoading={isLoading} onClick={onSubmit}>
					Next case
				</Button>
			</Fragment>
		)}
	</section>
);
