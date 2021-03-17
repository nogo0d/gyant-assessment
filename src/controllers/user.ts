import { RxHR, RxHttpRequestResponse } from '@akanass/rx-http-request';
import { observable } from '@devexperts/rx-utils/dist/observable.utils';
import { chain } from 'fp-ts-rxjs/lib/Observable';
import { combineLatest, Observable } from 'rxjs';
import { User } from '../models/user';
import { Effect } from '../utils/functions';
import { DEFAULT_API_OPTIONS } from './model';
export interface UserController {
	setToken: Effect<string>;
	get: (_: string) => Observable<RxHttpRequestResponse<any>>;
	upsert: (_: string) => Observable<RxHttpRequestResponse<any>>;
}

export const userController: UserController = (() => {
	const [setToken, token$] = observable.createAdapter<string>();
	const [internalGet, onGet$] = observable.createAdapter<string>();

	const internalGetResponse = combineLatest([onGet$, token$]).pipe(
		chain(([id, token]) =>
			RxHR.get<User>(`http://localhost:3003/user/${id}`, {
				...DEFAULT_API_OPTIONS,
				headers: {
					'Access-Control-Allow-Origin': 'http://localhost:3000',
					Authorization: `Bearer ${token}`,
				},
			}),
		),
	);

	return {
		setToken,
		get: (id: string) => {
			internalGet(id);
			return internalGetResponse;
		},
		upsert: (token: string) =>
			RxHR.put<User>(`http://localhost:3003/user`, {
				...DEFAULT_API_OPTIONS,
				headers: {
					'Access-Control-Allow-Origin': 'http://localhost:3000',
					Authorization: `Bearer ${token}`,
				},
			}),
	};
})();
