const express = require("express");
const router = express.Router();
const JobPostController = require("../Controlleurs/JobPostController");

// Ajouter un Job Post
router.post("/add", JobPostController.createJobPost);

// Récupérer tous les Job Posts
router.get("/get", JobPostController.getAllJobPosts);

module.exports = router;
