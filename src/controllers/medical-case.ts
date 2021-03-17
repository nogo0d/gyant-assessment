import { RxHR, RxHttpRequestResponse } from '@akanass/rx-http-request';
import { Lazy } from 'fp-ts/lib/function';
import { Observable, of } from 'rxjs';
import { MedicalCase } from '../models/hospital';
import { IC10 } from '../models/medical-condition';
import { DEFAULT_API_OPTIONS } from './model';

export interface MedicalCaseController {
	getAvailable: () => Observable<RxHttpRequestResponse<any>>;
	setTagged: (id: string, conditions: IC10[]) => Observable<RxHttpRequestResponse<any>>;
	create: (medicalCase: MedicalCase) => Observable<RxHttpRequestResponse<any>>;
	reset: Lazy<Observable<RxHttpRequestResponse<any>>>;
}

export const createMedicalCaseController = (authToken: string): MedicalCaseController => {
	// This is kind of a hack I know :(
	// UPS
	if (!authToken) {
		return {
			reset: () => of(),
			create: () => of(),
			getAvailable: () => of(),
			setTagged: () => of(),
		};
	}

	const create = ({ id, description }: MedicalCase) =>
		RxHR.post(`http://localhost:3003/medical-case`, {
			...DEFAULT_API_OPTIONS,
			headers: {
				'Access-Control-Allow-Origin': 'http://localhost:3000',
				Authorization: `Bearer ${authToken}`,
			},
			body: {
				id,
				description,
			},
		});

	const reset = () =>
		RxHR.delete(`http://localhost:3003/medical-cases`, {
			...DEFAULT_API_OPTIONS,
			headers: {
				'Access-Control-Allow-Origin': 'http://localhost:3000',
				Authorization: `Bearer ${authToken}`,
			},
		});

	const getAvailable = () =>
		RxHR.get(`http://localhost:3003/medical-case`, {
			...DEFAULT_API_OPTIONS,
			headers: {
				'Access-Control-Allow-Origin': 'http://localhost:3000',
				Authorization: `Bearer ${authToken}`,
			},
		});

	const setTagged = (id: string, conditions: IC10[]) => {
		const options = {
			...DEFAULT_API_OPTIONS,
			headers: {
				'Access-Control-Allow-Origin': 'http://localhost:3000',
				Authorization: `Bearer ${authToken}`,
			},
			body: {
				id,
				conditions,
			},
		};

		RxHR.get(`http://localhost:3003/medical-case`, {
			...DEFAULT_API_OPTIONS,
			headers: {
				'Access-Control-Allow-Origin': 'http://localhost:3000',
				Authorization: `Bearer ${authToken}`,
			},
		});

		return RxHR.post(`http://localhost:3003/medical-cases-conditions`, options);
	};

	return {
		create,
		getAvailable,
		setTagged,
		reset,
	};
};
