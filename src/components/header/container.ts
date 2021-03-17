import { withRX } from '@devexperts/react-kit/dist/utils/with-rx2';
import { context } from '@devexperts/rx-utils/dist/context2.utils';
import { option } from 'fp-ts';
import { constVoid } from 'fp-ts/lib/function';
import { runOnMount } from '../../utils/react';
import { Header } from './component';
import { createHeaderViewModel, HeaderViewModel } from './view-model';

const Container = context.combine(
	context.key<HeaderViewModel>()('headerViewModel'),
	({ doLogout$: onLogout$, user$, isLoading$ }) =>
		withRX(Header)(() => ({
			defaultProps: {
				isLoading: false,
				user: option.none,
				onLogout: constVoid,
			},
			props: {
				user: user$,
				isLoading: isLoading$,
				onLogout: onLogout$,
			},
		})),
);

export const HeaderContainer = context.combine(
	context.defer(Container, 'headerViewModel'),
	createHeaderViewModel,
	(Container, createHeaderViewModel) =>
		runOnMount(Container, () => () => ({ headerViewModel: createHeaderViewModel() })),
);
