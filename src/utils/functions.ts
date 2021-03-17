export type Effect<A> = (_: A) => void;
export const tupleArgs = <A extends unknown[], R>(f: (...args: A) => R): ((args: A) => R) => (args) => f(...args);
