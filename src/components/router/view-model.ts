import { context } from '@devexperts/rx-utils/dist/context2.utils';
import { filterMap } from 'fp-ts-rxjs/lib/Observable';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthServiceModel } from '../../services/model/auth';

export type RouterViewModel = {
	isAuthenticated$: Observable<boolean>;
	authToken$: Observable<string>;
};

export const createRouterViewModel = context.combine(
	context.key<AuthServiceModel>()('authServiceModel'),
	({ status$, user$ }) => (): RouterViewModel => ({
		isAuthenticated$: status$.pipe(map((v) => v === 'AUTHENTICATED')),
		authToken$: user$.pipe(
			filterMap((v) => v),
			map((v) => v.token),
		),
	}),
);
