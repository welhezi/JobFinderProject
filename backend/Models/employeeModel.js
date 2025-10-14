const User = require("./UserModel");

const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  //user: { type: mongoose.Schema.Types.ObjectId, ref: "Users", required: true },
  company: { type: String, required: true },
  description: { type: String },
  createdAt: { type: Date, default: Date.now },
  jobs: [{ type: mongoose.Schema.Types.ObjectId, ref: "JobPosts" }]
});

//module.exports = mongoose.model("Employees", employeeSchema);
//export const Employee = User.discriminator("Employees",employeeSchema)
const Employee = User.discriminator("Employees", employeeSchema, "employee");

module.exports = Employee;