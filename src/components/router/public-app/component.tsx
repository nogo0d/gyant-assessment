import React, { FC } from 'react';
import { context } from '@devexperts/rx-utils/dist/context2.utils';
import { Redirect, Route, Switch } from 'react-router';
import { LoginContainer } from '../../login/container';

export const PublicApp = context.combine(
	LoginContainer,
	(LoginContainer): FC => () => (
		<Switch>
			<Route path={'/'} render={() => <LoginContainer />} />
			<Redirect to={'/'} />
		</Switch>
	),
);
