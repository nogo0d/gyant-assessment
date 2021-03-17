import React, { FC } from 'react';
import { context } from '@devexperts/rx-utils/dist/context2.utils';
import { BrowserRouter } from 'react-router-dom';
import { PublicApp } from './public-app/component';
import { PrivateAppContainer } from './private-app/container';

type RouterProps = {
	isAuthenticated: boolean;
	authToken: string;
};

export const Router = context.combine(
	PublicApp,
	PrivateAppContainer,
	(PublicApp, PrivateAppContainer): FC<RouterProps> => ({ isAuthenticated, authToken }) => (
		<BrowserRouter>{isAuthenticated ? <PrivateAppContainer authToken={authToken} /> : <PublicApp />}</BrowserRouter>
	),
);
