import bodyParser from 'body-parser';
import { InjectAppInput } from './types';

export default ({ app }: InjectAppInput) => {
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));
};
