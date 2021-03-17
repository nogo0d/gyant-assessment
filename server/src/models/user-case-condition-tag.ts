import mongoose, { Schema, Document } from 'mongoose';

export interface UserCaseConditionTag extends Document {
	user: string;
	medicalCase: string;
	medicalCondition: string;
	stamp: Date;
}

const UserCaseConditionTagSchema: Schema = new Schema({
	user: { type: String, required: true },
	medicalCase: { type: String, required: true },
	medicalCondition: { type: String, required: true },
	stamp: { type: Date, required: true },
});

UserCaseConditionTagSchema.index({ user: 1, medicalCase: 1, medicalCondition: 1 }, { unique: true });

export default mongoose.model<UserCaseConditionTag>('UserCaseCondition', UserCaseConditionTagSchema);
