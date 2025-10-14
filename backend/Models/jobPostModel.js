const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const jobPostSchema = new Schema({
  title: String,
  description: String,
  mission: String,
  requirements: String,
  endDate: Date,
  location: String,
  id_employee: { type: Schema.Types.ObjectId, ref: "Employees" },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("JobPosts", jobPostSchema);

