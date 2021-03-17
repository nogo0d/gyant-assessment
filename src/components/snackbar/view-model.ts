import { merge, Observable } from 'rxjs';
import { Lazy, pipe } from 'fp-ts/lib/function';
import { filter, map, mapTo, tap } from 'rxjs/operators';
import { context } from '@devexperts/rx-utils/dist/context2.utils';
import { observable } from '@devexperts/rx-utils/dist/observable.utils';
import { newSink, Sink } from '@devexperts/rx-utils/dist/sink2.utils';
import { option } from 'fp-ts';
import { isSome } from 'fp-ts/lib/Option';
import { AuthServiceModel } from '../../services/model/auth';
import { ErrorServiceModel } from '../../services/model/error';
import { Message } from './model';

export type SnackbarViewModel = {
	message$: Observable<option.Option<Message>>;
	isOpen$: Observable<boolean>;
	onClose: Lazy<void>;
};

export const createSnackbarViewModel = context.combine(
	context.key<AuthServiceModel>()('authServiceModel'),
	context.key<ErrorServiceModel>()('errorServiceModel'),
	({ status$ }, { error$, remove, set }) => (): Sink<SnackbarViewModel> => {
		const [onClose, closing$] = observable.createAdapter<void>();

		const message$: Observable<option.Option<Message>> = error$.pipe(
			map((error) =>
				pipe(
					error,
					option.map((value) => ({ value, type: 'error' })),
				),
			),
		);

		const isOpen$ = message$.pipe(map(isSome));

		const closeEffect$ = closing$.pipe(tap(remove));

		const authErrorListenerEffect$ = status$.pipe(
			filter((v) => v === 'ERROR'),
			mapTo('There were some issues with login.'),
			tap(set),
		);

		const effect$ = merge(closeEffect$, authErrorListenerEffect$);

		return newSink(
			{
				message$,
				isOpen$,
				onClose,
			},
			merge(closeEffect$, effect$),
		);
	},
);
