import jwt from 'express-jwt';
import jwks from 'jwks-rsa';
import { InjectAppInput } from './types';

export default ({ app }: InjectAppInput) => {
	const jwtCheck = jwt({
		secret: jwks.expressJwtSecret({
			cache: false,
			rateLimit: false,
			jwksRequestsPerMinute: 5000,
			jwksUri: 'https://empty.eu.auth0.com/.well-known/jwks.json',
		}),
		audience: 'http://localhost:3000',
		issuer: 'https://empty.eu.auth0.com/',
		algorithms: ['RS256'],
	});

	app.use(jwtCheck);
	app.use((err: any, req: any, res: any, next: any) =>
		err.name === 'UnauthorizedError' ? res.status(403).json('Not authorized') : next(),
	);
};
