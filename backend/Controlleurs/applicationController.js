const JobPostModel = require("../Models/JobPostModel");
const ApplicationModel = require("../Models/ApplicationModel");
const { application } = require("express");
const UserModel = require("../Models/UserModel");


// Add new application
const addApplication = async (req, res) => {
  try {
    const { cover_letter, id_post, id_user } = req.body;

    // Vérification du fichier CV
    if (!req.file) {
      return res.status(400).json({ message: "CV file is required" });
    }

    // Vérification de l'utilisateur
    const user = await UserModel.findById(id_user); // ✅ Corrigé : tu cherches un user, pas une application
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Vérification de l'offre d'emploi
    const post = await JobPostModel.findById(id_post);
    if (!post) {
      return res.status(404).json({ message: "Job post not found" });
    }

    // Création de l'application
    const newApp = new ApplicationModel({
      cv: `/uploads/cvs/${req.file.filename}`,
      cover_letter,
      id_post,
      id_user,
    });

    await newApp.save();

    // Ajouter l'application dans le tableau des candidatures du post
    post.applications.push(newApp._id);
    await post.save();

    return res
      .status(201)
      .json({ message: "Application created successfully", data: newApp });

  } catch (error) {
    console.error("Error adding application:", error);
    return res.status(500).json({ error: error.message });
  }
};

// Récupérer tous les apps
const getAllAppsByPostID = async (req, res) => {
    try {
        const id_post = req.params.id
        const apps = await ApplicationModel.find({id_post}) 
            .populate("id_user", "-__v")
            .populate("id_post", "-__v"); 
        return res.status(200).json({ message: "applications data :", data: apps });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};


// get by id
const getAppByID = async (req, res) => {
    try {
        const id_app = req.params.id
        const app = await ApplicationModel.findById(id_app) 
            .populate("id_user", "-__v")
            .populate("id_post", "-__v"); 
        return res.status(200).json({ message: "application data :", data: app });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};













module.exports = {addApplication,getAllAppsByPostID,getAppByID}