const { application } = require("express");
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
  isDeleted : { type: Boolean, required: true, default : false},
  createdAt: { type: Date, default: Date.now },
  applications : [{ type: mongoose.Schema.Types.ObjectId, ref: "Applications" }]
});

module.exports = mongoose.model("JobPosts", jobPostSchema);

