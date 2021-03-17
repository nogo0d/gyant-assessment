import MedicalCondition, { MedicalCondition as IMedicalCondition } from '../models/medical-condition';

const GetAll = async (): Promise<IMedicalCondition[]> => MedicalCondition.find().exec();

const Create = async (id: string, name: string): Promise<IMedicalCondition> =>
	MedicalCondition.create({
		id,
		name,
	});

export default {
	GetAll,
	Create,
};
