import User from '../models/user';

type NakedUser = Record<'id' | 'name', string>;

const Get = async (id: string): Promise<NakedUser> =>
	User.findOne({ id }).then((data) => {
		if (data) {
			return { id: data.id, name: data.name };
		}
		throw 'not-found';
	});

const Create = async (id: string, name: string): Promise<NakedUser> =>
	User.create({
		id,
		name,
	});
const Upsert = async (id: string, name: string) => User.findOneAndUpdate({ id }, { $set: { name } }, { upsert: true });

export default {
	Get,
	Create,
	Upsert,
};
