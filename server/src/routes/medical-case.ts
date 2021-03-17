import fetch from 'node-fetch';
import { InjectAppInput } from '../types';
import MedicalCaseController from '../controllers/medical-cases';
import { OPEN_CORS } from '.';

export default ({ app }: InjectAppInput) => {
	app.options('/medical-case', OPEN_CORS);
	app.options('/medical-cases', OPEN_CORS);
	app.options('/medical-cases-conditions', OPEN_CORS);

	app.get('/medical-case', OPEN_CORS, async (_, res) =>
		MedicalCaseController.PickUntagOne()
			.then((medicalCase) => res.send(medicalCase))
			.catch((e) => {
				const notFound = e === 'not-found';
				const statusCode = notFound ? 404 : 500;
				const message = notFound ? 'no-more-cases' : 'Unknown Error';

				return res.status(statusCode).json(message);
			}),
	);
	app.post('/medical-case', OPEN_CORS, async (req, res) =>
		MedicalCaseController.Create(req.body)
			.then((medicalCase) => res.send({ medicalCase }))
			.catch(() => res.status(500).json('Unknown Error')),
	);
	app.put('/medical-case', OPEN_CORS, async (req, res) =>
		MedicalCaseController.Update(req.body)
			.then((medicalCase) => res.send({ medicalCase }))
			.catch(() => res.status(500).json('Unknown Error')),
	);
	app.delete('/medical-cases', OPEN_CORS, async (_, res) =>
		MedicalCaseController.ResetToDefault()
			.then(() => res.status(200).json('Great success!!'))
			.catch(() => res.status(500).json('Unknown Error')),
	);

	app.post('/medical-cases-conditions', OPEN_CORS, async (req, res) => {
		const splitAutorization = req.headers.authorization?.split(' ');

		if (splitAutorization) {
			const accessToken = splitAutorization[splitAutorization.length - 1];

			if (accessToken) {
				return fetch('https://empty.eu.auth0.com/userinfo', {
					headers: { authorization: `Bearer ${accessToken}` },
				})
					.then((response) => response.json())
					.then((response) => {
						const user: Record<'id', string> = {
							id: response.sub,
						};

						return MedicalCaseController.Tag(user.id, req.body.id, req.body.conditions)
							.then((v) => res.status(200).json(v))
							.catch((e) => res.status(500).json(`Unknown Error${e}`));
					})
					.catch(() => res.status(404).json('not-found'));
			}
		}

		return res.status(403).json('forbidden');
	});
};
