import { context } from '@devexperts/rx-utils/dist/context2.utils';
import { map } from 'fp-ts-rxjs/lib/Observable';
import { Lazy } from 'fp-ts/lib/function';
import { MedicalCaseController } from '../controllers/medical-case';
import { MedicalCase } from '../models/hospital';
import { IC10 } from '../models/medical-condition';
import { LiveData, toRemoteData } from '../utils/remote';

export type HospitalService = {
	getCase: Lazy<LiveData<Error, MedicalCase>>;
	createCase: (_: MedicalCase) => LiveData<Error, MedicalCase>;
	setTagged: (id: string, conditions: IC10[]) => LiveData<Error, void>;
	reset: Lazy<LiveData<Error, void>>;
};

export const createHospitalService = context.combine(
	context.key<MedicalCaseController>()('medicalCaseController'),
	({ getAvailable, create: createCase, setTagged, reset }) => (): HospitalService => ({
		getCase: () => getAvailable().pipe(map(toRemoteData)),
		createCase: (medicalCase) => createCase(medicalCase).pipe(map(toRemoteData)),
		setTagged: (id: string, conditions: IC10[]) => setTagged(id, conditions).pipe(map(toRemoteData)),
		reset: () => reset().pipe(map(toRemoteData)),
	}),
);
