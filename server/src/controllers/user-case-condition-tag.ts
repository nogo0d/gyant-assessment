import UserCaseConditionTag, { UserCaseConditionTag as IUserCaseConditionTag } from '../models/user-case-condition-tag';

const Create = async (user: string, medicalCase: string, medicalCondition: string): Promise<IUserCaseConditionTag> =>
	UserCaseConditionTag.create({
		user,
		medicalCase,
		medicalCondition,
		stamp: new Date(),
	});
const Upsert = async (user: string, medicalCase: string, medicalCondition: string) =>
	UserCaseConditionTag.findOneAndUpdate(
		{ user, medicalCase, medicalCondition },
		{ $set: { medicalCase, medicalCondition } },
		{ upsert: true },
	);

const Delete = async (user: string, medicalCondition: string, medicalCase: string) => {
	UserCaseConditionTag.deleteOne({
		user,
		medicalCase,
		medicalCondition,
	});
};

const Get = async (
	user: string,
	medicalCase: string,
	medicalCondition: string,
): Promise<IUserCaseConditionTag | null> =>
	UserCaseConditionTag.findOne({
		user,
		medicalCase,
		medicalCondition,
	});

export default {
	Upsert,
	Create,
	Delete,
	Get,
};
