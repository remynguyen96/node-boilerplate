import mongoose, { Schema } from 'mongoose';

const UsersSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  created_on: {
    type: Date,
    default: Date.now()
  }
});

const Users = mongoose.model('Users', UsersSchema);

export default Users;
