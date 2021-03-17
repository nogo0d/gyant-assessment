import React, { context } from '@devexperts/rx-utils/dist/context2.utils';
import { FC, Fragment } from 'react';
import { HeaderContainer } from '../header/container';
import { RouterContainer } from '../router/container';
import { SnackbarContainer } from '../snackbar/container';

export const App = context.combine(
	HeaderContainer,
	RouterContainer,
	SnackbarContainer,
	(Header, Router, Snackbar): FC => () => (
		<Fragment>
			<Header />
			<Router />
			<Snackbar />
		</Fragment>
	),
);
