import { context } from '@devexperts/rx-utils/dist/context2.utils';
import { option } from 'fp-ts';
import { Observable } from 'rxjs';
import { Lazy } from 'fp-ts/lib/function';
import { map } from 'rxjs/operators';
import { AuthServiceModel } from '../../services/model/auth';
import { User } from '../../models/user';

export type HeaderViewModel = {
	user$: Observable<option.Option<User>>;
	isLoading$: Observable<boolean>;
	doLogout$: Observable<Lazy<void>>;
};

export const createHeaderViewModel = context.combine(
	context.key<AuthServiceModel>()('authServiceModel'),
	({ user$, status$, doLogout$ }) => (): HeaderViewModel => ({
		user$,
		isLoading$: status$.pipe(map((v) => v === 'LOADING')),
		doLogout$,
	}),
);
