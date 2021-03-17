import { withRX } from '@devexperts/react-kit/dist/utils/with-rx2';
import { context } from '@devexperts/rx-utils/dist/context2.utils';
import { runOnMount } from '../../utils/react';
import { Router } from './component';
import { RouterViewModel, createRouterViewModel } from './view-model';

const Container = context.combine(
	Router,
	context.key<RouterViewModel>()('routerViewModel'),
	(Router, { isAuthenticated$, authToken$ }) =>
		withRX(Router)(() => ({
			defaultProps: {
				isAuthenticated: false,
				authToken: '',
			},
			props: {
				isAuthenticated: isAuthenticated$,
				authToken: authToken$,
			},
		})),
);

export const RouterContainer = context.combine(
	context.defer(Container, 'routerViewModel'),
	createRouterViewModel,
	(Container, createRouterViewModel) =>
		runOnMount(Container, () => () => ({ routerViewModel: createRouterViewModel() })),
);
