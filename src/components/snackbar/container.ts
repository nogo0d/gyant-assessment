import { withRX } from '@devexperts/react-kit/dist/utils/with-rx2';
import { context } from '@devexperts/rx-utils/dist/context2.utils';
import { sink } from '@devexperts/rx-utils/dist/sink2.utils';
import { pipe } from 'fp-ts/lib/function';
import { option } from 'fp-ts';
import { runOnMount } from '../../utils/react';
import { Snackbar } from './component';
import { createSnackbarViewModel, SnackbarViewModel } from './view-model';

const Container = context.combine(
	context.key<SnackbarViewModel>()('snackbarViewModel'),
	({ message$, isOpen$, onClose }) =>
		withRX(Snackbar)(() => ({
			defaultProps: {
				message: option.none,
				isOpen: false,
				onClose,
			},
			props: {
				message: message$,
				isOpen: isOpen$,
			},
		})),
);

export const SnackbarContainer = context.combine(
	context.defer(Container, 'snackbarViewModel'),
	createSnackbarViewModel,
	(Container, createSnackbarViewModel) =>
		runOnMount(Container, () => () =>
			pipe(
				createSnackbarViewModel(),
				sink.map((snackbarViewModel) => ({ snackbarViewModel })),
			),
		),
);
