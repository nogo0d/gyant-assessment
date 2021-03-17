import { context } from '@devexperts/rx-utils/dist/context2.utils';
import { sink } from '@devexperts/rx-utils/dist/sink2.utils';
import { pipe } from 'fp-ts/lib/function';
import { userController } from '../../controllers/user';
import { createAuthServiceModel } from '../../services/model/auth';
import { createErrorServiceModel } from '../../services/model/error';
import { runOnMount } from '../../utils/react';
import { App } from './component';

const errorServiceModel = createErrorServiceModel();

const ContainerWithDI = context.combine(
	context.defer(App, 'authServiceModel', 'errorServiceModel'),
	context.defer(createAuthServiceModel, 'userController'),
	(Container, createAuthServiceModel) =>
		runOnMount(Container, () => () =>
			pipe(
				createAuthServiceModel({ userController }),
				sink.map((authServiceModel) => ({
					authServiceModel,
					errorServiceModel,
				})),
			).value,
		),
);

export const AppContainer = runOnMount(ContainerWithDI, () => () => ({}));
