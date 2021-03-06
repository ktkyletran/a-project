import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  name: { type: String, required: true},
  email: { type: String, required: true },
  password: { type: String, required: true },
  id: { type: String },
});

const User = mongoose.model("User", userSchema)

export default User;