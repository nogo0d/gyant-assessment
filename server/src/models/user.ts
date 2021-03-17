import mongoose, { Schema, Document } from 'mongoose';

export interface User extends Document {
	id: string;
	name: string;
}

const UserSchema: Schema = new Schema({
	id: { type: String, required: true, unique: true },
	name: { type: String, required: true },
});

export default mongoose.model<User>('User', UserSchema);
