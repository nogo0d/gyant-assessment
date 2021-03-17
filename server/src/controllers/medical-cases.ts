import MedicalCase, { MedicalCase as IMedicalCase } from '../models/medical-case';
import { IC10 } from '../models/medical-condition';
import UserCaseConditionTagController from './user-case-condition-tag';

type NakedMedicalCase = {
	id: string;
	description: string;
	wasChose: boolean;
	isTagged: boolean;
	lastStamp: Date;
	tagStamp?: Date;
};

type OptionalMedicalCase = {
	id: string;
	description?: string;
	wasChose?: boolean;
	isTagged?: boolean;
	lastStamp?: Date;
	tagStamp?: Date;
};

const Create = async ({
	id = 'NOT_PROVIDED',
	description = 'NOT_PROVIDED',
	wasChose = false,
	isTagged = false,
}: OptionalMedicalCase): Promise<IMedicalCase> =>
	MedicalCase.create({
		id,
		description,
		wasChose: wasChose,
		isTagged: isTagged,
		lastStamp: new Date(),
		tagStamp: undefined,
	});
const Update = async ({ id, description, isTagged, wasChose }: OptionalMedicalCase): Promise<NakedMedicalCase> => {
	const $set: Record<string, any> = {};

	if (isTagged !== undefined) {
		$set['isTagged'] = isTagged;
	}

	if (wasChose !== undefined) {
		$set['wasChose'] = wasChose;
	}

	if (description !== undefined) {
		$set['description'] = description;
	}

	return MedicalCase.findOneAndUpdate({ id }, { $set }).then((data) => {
		if (data) {
			return {
				id: data.id,
				description: data.description,
				wasChose: Boolean(data.wasChose),
				isTagged: Boolean(data.isTagged),
				lastStamp: data.lastStamp || new Date(),
				tagStamp: data.tagStamp,
			};
		}
		throw 'not-found';
	});
};

const PickUntagOne = async (): Promise<NakedMedicalCase> =>
	MedicalCase.findOneAndUpdate(
		{ isTagged: false },
		{
			$set: {
				wasChose: true,
				lastStamp: new Date(),
			},
		},
	).then((data) => {
		if (data) {
			return {
				id: data.id,
				description: data.description,
				wasChose: Boolean(data.wasChose),
				isTagged: Boolean(data.isTagged),
				lastStamp: data.lastStamp || new Date(),
				tagStamp: data.tagStamp,
			};
		}
		throw 'not-found';
	});

const ResetToDefault = async () =>
	MedicalCase.updateMany({
		$set: {
			isTagged: false,
			wasChose: false,
			lastStamp: new Date(),
			tagStamp: undefined,
		},
	});

const Tag = async (userID: string, caseID: string, conditions: IC10[]): Promise<NakedMedicalCase> => {
	const tasks = conditions.map((conditionID) => UserCaseConditionTagController.Upsert(userID, caseID, conditionID));

	return Promise.all(tasks).then(() => Update({ id: caseID, wasChose: true, isTagged: true, tagStamp: new Date() }));
};

export default {
	Create,
	Update,
	PickUntagOne,
	ResetToDefault,
	Tag,
};
