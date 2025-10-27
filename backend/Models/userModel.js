const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  image: { type: String },
  civility: { type: String, enum: ["mr", "ms", "mrs"] },
  birthday: { type: Date },
  address: { type: String },
  cv : {type: String} ,
  role: { type: String, enum: ["user", "employee", "admin"], default: "user" },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isDeleted : { type: Boolean, required: true, default : false},
  resetToken : { type : String},
  createdAt: { type: Date, default: Date.now }
},{discriminatorKey:"role",timestamps: true});

//export const User = mongoose.model("Users", userSchema);
//module.exports = mongoose.model("Users", userSchema);
const User = mongoose.model("Users", userSchema);

module.exports = User;
