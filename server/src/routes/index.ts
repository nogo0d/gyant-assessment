import cors from 'cors';
import { InjectAppInput } from '../types';
import userRoutes from './user';
import medicalConditionRoutes from './medical-condition';
import medicalCasesRoutes from './medical-case';
import userCaseConditionTagRoutes from './user-case-condition-tag';

export const OPEN_CORS = cors({ credentials: true, origin: 'http://localhost:3000' });

export default ({ app }: InjectAppInput) => {
	userRoutes({ app });
	medicalConditionRoutes({ app });
	medicalCasesRoutes({ app });
	userCaseConditionTagRoutes({ app });
};
