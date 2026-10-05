import { Schema, models, model } from 'mongoose';
const TaskSchema = new Schema({
  title: { type: String, required: true, trim: true, maxlength: 100 },
  description: { type: String, default: '', maxlength: 1000 },
  status: { type: String, enum: ['TODO','IN_PROGRESS','COMPLETED'], default: 'TODO' },
  priority: { type: String, enum: ['LOW','MEDIUM','HIGH'], default: 'MEDIUM' },
  dueDate: { type: Date, default: null },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true }
}, { timestamps: true });
TaskSchema.index({ userId: 1, status: 1 });
export default models.Task || model('Task', TaskSchema);