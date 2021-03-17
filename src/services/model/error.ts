import { observable } from '@devexperts/rx-utils/dist/observable.utils';
import { option } from 'fp-ts';
import { map } from 'fp-ts-rxjs/lib/Observable';
import { Lazy } from 'fp-ts/lib/function';
import { Observable } from 'rxjs';
import { pipe } from 'fp-ts/lib/pipeable';
import { fromPredicate } from 'fp-ts/lib/Option';
import { Effect } from '../../utils/functions';

export type ErrorServiceModel = {
	error$: Observable<option.Option<string>>;
	set: Effect<string>;
	remove: Lazy<void>;
};

export const createErrorServiceModel = (): ErrorServiceModel => {
	const [set, onSet$] = observable.createAdapter<string>();

	const error$ = onSet$.pipe(map((error) => pipe(error, fromPredicate<string>(Boolean))));

	return {
		error$,
		set,
		remove: () => set(''),
	};
};
