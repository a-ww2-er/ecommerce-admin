// User.js

import {model, Schema, models} from "mongoose";

const UserSchema = new Schema({
  name: {type: String, required: true,},
  email: {type: String, required: true, unique: true,},
  password: {type: String, required: true,},
  role: {type: String,required: true,},
});

export const User = models.User || model('User', UserSchema);
