import { context } from '@devexperts/rx-utils/dist/context2.utils';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthServiceModel } from '../../services/model/auth';
import { Effect } from '../../utils/functions';

export type LoginViewModel = {
	isLoading$: Observable<boolean>;
	effect$: Observable<unknown>;
	doLogin: Effect<void>;
};

export const createLoginViewModel = context.combine(
	context.key<AuthServiceModel>()('authServiceModel'),
	({ status$, effect$, doLogin }) => (): LoginViewModel => ({
		isLoading$: status$.pipe(map((status) => status === 'AUTHENTICATED' || status === 'LOADING')),
		effect$,
		doLogin,
	}),
);
