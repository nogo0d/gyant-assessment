import mongoose, { Schema, Document } from 'mongoose';

export interface MedicalCase extends Document {
	id: string;
	description: string;
	wasChose?: boolean;
	isTagged?: boolean;
	tagStamp?: Date;
	lastStamp?: Date;
}

const MedicalCaseSchema: Schema = new Schema({
	id: { type: String, required: true, unique: true },
	description: { type: String, required: true },
	wasChose: { type: Boolean, required: false },
	isTagged: { type: Boolean, required: false },
	tagStamp: { type: Date, required: false },
	lastStamp: { type: Date, required: false },
});

export default mongoose.model<MedicalCase>('MedicalCase', MedicalCaseSchema);
