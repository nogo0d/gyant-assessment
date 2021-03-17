import { withRX } from '@devexperts/react-kit/dist/utils/with-rx2';
import { context } from '@devexperts/rx-utils/dist/context2.utils';
import { runOnMount } from '../../utils/react';
import { Login } from './component';
import { createLoginViewModel, LoginViewModel } from './view-model';

const Container = context.combine(
	context.key<LoginViewModel>()('loginViewModel'),
	({ isLoading$, effect$: effects$, doLogin: onLogin }) =>
		withRX(Login)(() => ({
			defaultProps: {
				isLoading: false,
				onLogin,
			},
			props: {
				isLoading: isLoading$,
			},
			effects$,
		})),
);

export const LoginContainer = context.combine(
	context.defer(Container, 'loginViewModel'),
	createLoginViewModel,
	(Container, createLoginViewModel) =>
		runOnMount(Container, () => () => ({ loginViewModel: createLoginViewModel() })),
);
