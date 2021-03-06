import { option } from 'fp-ts';
import { getOrElse, isSome } from 'fp-ts/lib/Option';

export const getOrEmptyString = (value: option.Option<string>) => (isSome(value) ? value.value : '');
export const getOrEmptyArray = getOrElse(() => []);
