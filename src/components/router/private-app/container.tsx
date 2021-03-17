import { context } from '@devexperts/rx-utils/dist/context2.utils';
import { pipe } from 'fp-ts/lib/pipeable';
import { sink } from '@devexperts/rx-utils/dist/sink2.utils';
import { runOnMount, withProps } from '../../../utils/react';
import { createHospitalService } from '../../../services/hospital';
import { createMedicalCaseController } from '../../../controllers/medical-case';

import { PrivateApp } from './component';

const withAuthToken = withProps<{ authToken: string }>();

export const PrivateAppContainer = context.combine(
	context.defer(PrivateApp, 'hospitalService'),
	context.defer(createHospitalService, 'medicalCaseController'),
	(PrivateApp, createHospitalService) =>
		runOnMount(pipe(PrivateApp, context.map(withAuthToken)), () => ({ authToken }) => {
			const medicalCaseController = createMedicalCaseController(authToken);

			return pipe(
				createHospitalService({ medicalCaseController }),
				sink.map((createHospital) => ({ hospitalService: createHospital() })),
			);
		}),
);
