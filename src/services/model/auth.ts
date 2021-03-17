import { option } from 'fp-ts';
import { observable } from '@devexperts/rx-utils/dist/observable.utils';
import { Observable } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import createAuth0Client, { Auth0Client } from '@auth0/auth0-spa-js';
import { Lazy } from 'fp-ts/lib/function';
import { context } from '@devexperts/rx-utils/dist/context2.utils';
import { of } from 'fp-ts-rxjs/lib/Observable';
import { isFailure, isSuccess } from '@devexperts/remote-data-ts';
import { User } from '../../models/user';
import { AUTH_DETAILS } from '../../auth/config';
import { UserController } from '../../controllers/user';
import { toRemoteData } from '../../utils/remote';

type AuthStatus = 'LOADING' | 'ERROR' | 'AUTHENTICATED' | 'UNAUTHENTICATED';

export type AuthServiceModel = {
	user$: Observable<option.Option<User>>;
	status$: Observable<AuthStatus>;
	doLogout$: Observable<Lazy<void>>;
	effect$: Observable<unknown>;
	doLogin: Lazy<void>;
};

export const createAuthServiceModel = context.combine(
	context.key<UserController>()('userController'),
	({ upsert }): AuthServiceModel => {
		const [setStatus, status$] = observable.createAdapter<AuthStatus>();
		const [setAuthClient, authClient$] = observable.createAdapter<Auth0Client>();
		const [setUser, user$] = observable.createAdapter<option.Option<User>>();

		const createClient = () =>
			createAuth0Client(AUTH_DETAILS).then((authClient) => {
				setAuthClient(authClient);
				return authClient;
			});

		const doLogin = () => {
			setStatus('LOADING');
			createAuth0Client(AUTH_DETAILS)
				.then((authClient) => {
					setAuthClient(authClient);
					authClient.loginWithRedirect();
				})
				.catch(() => {
					setUser(option.none);
					setStatus('ERROR');
				});
		};

		const doLogout$ = authClient$.pipe(map((authClient) => () => authClient.logout()));
		const initEffect$ = of(true).pipe(
			map(() => {
				createClient().then((authClient) => {
					setStatus('LOADING');
					authClient
						.checkSession()
						.then(() => authClient.getTokenSilently())
						.then((token: string) => {
							const userRequest$ = upsert(token).pipe(
								map(toRemoteData),
								tap((response) => {
									isSuccess(response) && setStatus('AUTHENTICATED');
									isFailure(response) && setStatus('ERROR');
								}),
								filter(isSuccess),
								tap(({ value }) =>
									setUser(
										option.some({
											...value,
											token,
										}),
									),
								),
							);
							// UPS
							userRequest$.subscribe();

							return upsert(token);
						})
						.catch((e) => {
							const isLoginRequired = e.message === 'Login required';
							setUser(option.none);

							if (!isLoginRequired) {
								setStatus('ERROR');
							} else {
								setStatus('UNAUTHENTICATED');
							}
						});
				});
			}),
		);

		return {
			user$,
			status$,
			doLogout$,
			effect$: initEffect$,
			doLogin,
		};
	},
);
