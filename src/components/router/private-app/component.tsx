import React, { FC } from 'react';
import { context } from '@devexperts/rx-utils/dist/context2.utils';
import { Redirect, Route, Switch } from 'react-router';
import { DashboardContainer } from '../../dashboard/container';

export const PrivateApp = context.combine(
	DashboardContainer,
	(DashboardContainer): FC => () => (
		<Switch>
			<Route path={'/dashboard'} render={() => <DashboardContainer />} />
			<Redirect to={'/dashboard'} />
		</Switch>
	),
);
