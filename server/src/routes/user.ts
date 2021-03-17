import fetch from 'node-fetch';
import { InjectAppInput } from '../types';
import UserController from '../controllers/users';
import { OPEN_CORS } from '.';

export default ({ app }: InjectAppInput) => {
	app.options('/user', OPEN_CORS);

	app.get('/user', OPEN_CORS, async (req, res) => {
		const splitAutorization = req.headers.authorization?.split(' ');

		if (splitAutorization) {
			const accessToken = splitAutorization[splitAutorization.length - 1];

			if (accessToken) {
				return fetch('https://empty.eu.auth0.com/userinfo', {
					headers: { authorization: `Bearer ${accessToken}` },
				})
					.then((response) => response.json())
					.then(({ sub: id }) => UserController.Get(id))
					.then((user) => res.send(user))
					.catch((e) => {
						const notFound = e === 'not-found';
						const statusCode = notFound ? 404 : 500;
						const message = notFound ? 'User not found' : 'Unknown Error';

						return res.status(statusCode).json(message);
					});
			}
		}
	});

	app.put('/user', OPEN_CORS, async (req, res) => {
		const splitAutorization = req.headers.authorization?.split(' ');

		if (splitAutorization) {
			const accessToken = splitAutorization[splitAutorization.length - 1];

			if (accessToken) {
				return fetch('https://empty.eu.auth0.com/userinfo', {
					headers: { authorization: `Bearer ${accessToken}` },
				})
					.then((response) => response.json())
					.then((response) => {
						const user: Record<'id' | 'name', string> = {
							id: response.sub,
							name: response.name,
						};

						return UserController.Upsert(user.id, user.name)
							.then(() => res.send(user))
							.catch((e) => {
								const notFound = e === 'not-found';
								const statusCode = notFound ? 404 : 500;
								const message = notFound ? 'User not found' : 'Unknown Error';

								return res.status(statusCode).json(message);
							});
					});
			}
		}

		return res.status(404).json('not-found');
	});
};
