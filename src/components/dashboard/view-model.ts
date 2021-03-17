import { combineLatest, merge, Observable, of } from 'rxjs';
import { context } from '@devexperts/rx-utils/dist/context2.utils';
import { option } from 'fp-ts';
import { initial, isFailure, isPending, isSuccess, success, toOption } from '@devexperts/remote-data-ts';
import { tapRD } from '@devexperts/rx-utils/dist/rd/operators/tapRD';
import { filter, map, startWith, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { observable } from '@devexperts/rx-utils/dist/observable.utils';
import { constNull, Lazy, pipe } from 'fp-ts/lib/function';
import { newSink, Sink } from '@devexperts/rx-utils/dist/sink2.utils';
import { HospitalService } from '../../services/hospital';
import { MedicalCase } from '../../models/hospital';
import { Effect } from '../../utils/functions';
import { LiveData, shareReplayWithDefaults } from '../../utils/remote';
import { IC10, MedicalCondition } from '../../models/medical-condition';
import { ErrorServiceModel } from '../../services/model/error';

type TagData = {
	id: string;
	conditions: IC10[];
};

export type DashboardViewModel = {
	isLoading$: Observable<boolean>;
	resetStatus$: LiveData<Error, void>;
	isFinished$: Observable<boolean>;
	medicalCase$: Observable<option.Option<MedicalCase>>;
	onSelectMedicalConditions: Effect<MedicalCondition[]>;
	onSubmit: Lazy<void>;
	doReset: Lazy<void>;
};

export const createDashboardViewModel = context.combine(
	context.key<HospitalService>()('hospitalService'),
	context.key<ErrorServiceModel>()('errorServiceModel'),
	({ getCase, setTagged, reset }, { set }) => (): Sink<DashboardViewModel> => {
		const [setLoadingNext, isLoadingNext$] = observable.createAdapter<boolean>();
		const [triggerTag, onTriggerTag$] = observable.createAdapter<TagData>();
		const [doReset, onReset$] = observable.createAdapter<void>();
		const [onSubmit, onSubmit$] = observable.createAdapter<void>();
		const [getNewCase, onGetNewCase$] = observable.createAdapter<void>();
		const [onSelectMedicalConditions, selectedMedicalConditions$] = observable.createAdapter<MedicalCondition[]>();
		const requestCaseStatus$ = onGetNewCase$.pipe(switchMap(getCase), shareReplayWithDefaults());
		const tagStatus$ = onTriggerTag$.pipe(
			switchMap(({ id, conditions }) => setTagged(id, conditions)),
			shareReplayWithDefaults(),
		);
		const medicalCase$ = requestCaseStatus$.pipe(map(toOption));
		const resetStatus$ = onReset$.pipe(switchMap(reset));
		const newCaseTrigger$ = merge(tagStatus$, resetStatus$, of(success(undefined)));

		const isSubmitBlocked$ = onSubmit$.pipe(
			withLatestFrom(selectedMedicalConditions$.pipe(startWith([]))),
			map(([, selectedMedicalConditions]) => !selectedMedicalConditions.filter(Boolean).length),
			startWith(true),
		);
		const isLoading$ = combineLatest([
			requestCaseStatus$.pipe(startWith(initial)),
			tagStatus$.pipe(startWith(initial)),
		]).pipe(map(([requestCaseStatus, tagStatus]) => isPending(requestCaseStatus) || isPending(tagStatus)));

		const isFinished$ = requestCaseStatus$.pipe(
			map((status) => isFailure(status) && status.error.toString() === 'no-more-cases'),
			shareReplayWithDefaults(),
			tap((isFinished) => isFinished && set('No more cases were found')),
		);

		const triggerEffect$ = newCaseTrigger$.pipe(
			filter(isSuccess),
			tap(() => getNewCase()),
		);

		const submitEffect$ = onSubmit$.pipe(
			withLatestFrom(isSubmitBlocked$, selectedMedicalConditions$, medicalCase$),
			filter(([, isSubmitBlocked]) => !isSubmitBlocked),
			tap(() => setLoadingNext(true)),
			tap(([, , conditions, medicalCase]) =>
				pipe(
					medicalCase,
					option.fold(constNull, ({ id }) =>
						triggerTag({
							id,
							conditions: conditions.map(({ id }) => id),
						}),
					),
				),
			),
		);

		const noConditionsErrorEffect$ = onSubmit$.pipe(
			withLatestFrom(isSubmitBlocked$),
			tap(([, isBlocked]) => isBlocked && set('You have to choose at least one condition')),
		);
		const getCaseErrorListener$ = requestCaseStatus$.pipe(
			filter(isFailure),
			tap(() => set(`Couldn't fetch case! Error ocurred.`)),
		);
		const tagErrorListener$ = tagStatus$.pipe(
			filter(isFailure),
			tap(() => set(`Couldn't tag case! Error ocurred.`)),
		);
		const resetErrorListener$ = resetStatus$.pipe(
			tap((s) => console.log('resetErrorListener$', s)),
			filter(isFailure),
			tap(() => set(`Couldn't reste cases! Error ocurred.`)),
		);

		const resetPreviousEffect$ = tagStatus$.pipe(tapRD(() => onSelectMedicalConditions([])));
		const effect$ = merge(
			triggerEffect$,
			requestCaseStatus$,
			submitEffect$,
			noConditionsErrorEffect$,
			resetPreviousEffect$,
			getCaseErrorListener$,
			tagErrorListener$,
			resetErrorListener$,
		);

		// UPS
		medicalCase$.subscribe();
		return newSink(
			{
				isLoading$: merge(isLoading$, isLoadingNext$),
				isFinished$,
				medicalCase$: medicalCase$.pipe(tap((v) => console.log('medical case', v))),
				resetStatus$,
				onSelectMedicalConditions,
				onSubmit,
				doReset,
			},
			effect$,
		);
	},
);
