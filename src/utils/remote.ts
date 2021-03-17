import { RxHttpRequestResponse } from '@akanass/rx-http-request';
import { failure, RemoteData, success } from '@devexperts/remote-data-ts';
import { Observable } from 'rxjs';
import { OperatorFunction } from 'rxjs/internal/types';
import { shareReplay } from 'rxjs/operators';

export type LiveData<A extends Error, B> = Observable<RemoteData<A, B>>;
export function shareReplayWithDefaults<T>(): OperatorFunction<T, T> {
	return (source$: Observable<T>) => source$.pipe(shareReplay({ bufferSize: 1, refCount: true }));
}
export const toFailure = (error: Error) => failure(error);
export const toSuccess = <T>(data: T) => success(data);
export const toRemoteData = <A>({ response: { statusCode, body } }: RxHttpRequestResponse<A>): RemoteData<Error, A> =>
	statusCode === 200 ? success(body as A) : failure(body);
