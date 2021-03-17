import { InjectAppInput } from '../types';
import UserCaseConditionTagController from '../controllers/user-case-condition-tag';
import { OPEN_CORS } from '.';

export default ({ app }: InjectAppInput) => {
	app.get('/user-case-condition-tag/:user/:case/:condition', OPEN_CORS, async (req, res) =>
		UserCaseConditionTagController.Get(req.params.user, req.params.case, req.params.condition)
			.then((medicalConditions) => (medicalConditions ? res.send() : res.status(404).json('Not Found')))
			.catch((e) => res.status(500).json(`Unknown Error; ${e}`)),
	);
	app.delete('/user-case-condition-tag/:user/:case/:condition', OPEN_CORS, async (req, res) =>
		UserCaseConditionTagController.Delete(req.params.user, req.params.case, req.params.condition)
			.then((medicalCondition) => res.send(medicalCondition))
			.catch(() => res.status(500).json('Unknown Error')),
	);
	app.post('/user-case-condition-tag/:user/:case/:condition', OPEN_CORS, async (req, res) =>
		UserCaseConditionTagController.Create(req.params.user, req.params.case, req.params.condition)
			.then((medicalCondition) => res.send(medicalCondition))
			.catch((e) => res.status(500).json(`Unknown Error${e}`)),
	);
};
