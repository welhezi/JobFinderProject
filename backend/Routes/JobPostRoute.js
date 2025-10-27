const express = require("express");
const router = express.Router();
const JobPostController = require("../Controlleurs/JobPostController");
const authentificated = require("../Middleware/authentificated");

// Ajouter un Job Post
router.post("/add",authentificated, JobPostController.createJobPost);

// Récupérer tous les Job Posts
router.get("/get",authentificated, JobPostController.getAllJobPosts);

// Récupérer les detailos d'un Job Post
router.get("/get/:id",authentificated, JobPostController.getJobPostDetailsById);

// del Job Post
router.delete("/del/:id",authentificated, JobPostController.deletePost);

// update Job Post
router.put("/update/:id",authentificated, JobPostController.updatePost);


module.exports = router;
