import { withRX } from '@devexperts/react-kit/dist/utils/with-rx2';
import { initial } from '@devexperts/remote-data-ts';
import { context } from '@devexperts/rx-utils/dist/context2.utils';
import { sink } from '@devexperts/rx-utils/dist/sink2.utils';
import { option } from 'fp-ts';
import { pipe } from 'fp-ts/lib/pipeable';
import { runOnMount } from '../../utils/react';
import { Dashboard } from './component';
import { createDashboardViewModel, DashboardViewModel } from './view-model';

const Container = context.combine(
	context.key<DashboardViewModel>()('dashboardViewModel'),
	({ medicalCase$, isFinished$, isLoading$, resetStatus$, onSelectMedicalConditions, onSubmit, doReset }) =>
		withRX(Dashboard)(() => ({
			defaultProps: {
				isFinished: false,
				isLoading: false,
				medicalCase: option.none,
				resetSwitchConditions: false,
				resetStatus: initial,
				onSelectMedicalConditions,
				onSubmit,
				onReset: doReset,
			},
			props: {
				isFinished: isFinished$,
				isLoading: isLoading$,
				medicalCase: medicalCase$,
				resetStatus: resetStatus$,
			},
		})),
);

export const DashboardContainer = context.combine(
	context.defer(Container, 'dashboardViewModel'),
	createDashboardViewModel,
	(Container, createDashboardViewModel) =>
		runOnMount(Container, () => () =>
			pipe(
				createDashboardViewModel(),
				sink.map((dashboardViewModel) => ({ dashboardViewModel })),
			),
		),
);
