const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const applicationSchema = new mongoose.Schema({
  cv: { type: String, required: true },
  cover_letter : { type: String },
  id_post: { type: mongoose.Schema.Types.ObjectId, ref: "JobPosts"},
  id_user: { type: Schema.Types.ObjectId, ref: "Users"},
  createdAt: { type: Date, default: Date.now },
  status: { type: String, enum: ["accepted", "rejected", "pending"], default: "pending" }
});

const Application = mongoose.model("Applications", applicationSchema);
module.exports = Application