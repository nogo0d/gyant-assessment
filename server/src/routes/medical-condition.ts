import { InjectAppInput } from '../types';
import MedicalConditionsController from '../controllers/medical-conditions';
import { OPEN_CORS } from '.';

export default ({ app }: InjectAppInput) => {
	app.options('/medical-conditions', OPEN_CORS);
	app.get('/medical-conditions', OPEN_CORS, async (_, res) =>
		MedicalConditionsController.GetAll()
			.then((medicalConditions) => res.send(medicalConditions))
			.catch(() => res.status(500).json('Unknown Error')),
	);
	app.post('/medical-condition', OPEN_CORS, async (req, res) =>
		MedicalConditionsController.Create(req.body.id, req.body.name)
			.then((medicalCondition) => res.send(medicalCondition))
			.catch(() => res.status(500).json('Unknown Error')),
	);
};
