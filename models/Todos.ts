import mongoose, { Schema, model, models } from 'mongoose';

const TodoSchema = new Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  completed: { type: Boolean, default: false },
});

export default models.Todo || model('Todo', TodoSchema);
