const JobPostModel = require("../Models/JobPostModel");
const ApplicationModel = require("../Models/ApplicationModel");
const { application } = require("express");
const UserModel = require("../Models/UserModel");
const { sendEmailTo } = require("../Utils/sendEmail");


// Add new application
const addApplication = async (req, res) => {
  try {
    const { cover_letter, id_post, id_user,status } = req.body;

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
      cv: `${req.file.filename}`,
      cover_letter,
      id_post,
      id_user,
      status
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




// update application
const updateApplication = async (req, res) => {
  try {
    const appId = req.params.id;
    const { status, cover_letter } = req.body;

    // 🔹 Récupérer l'application avec ses relations
    const app = await ApplicationModel.findById(appId)
      .populate("id_user", "-__v")
      .populate("id_post", "-__v");

    if (!app) {
      return res.status(404).json({ message: "Application not found" });
    }

    // 🔹 Mettre à jour les champs
    if (status) app.status = status;
    if (cover_letter) app.cover_letter = cover_letter;

    await app.save();

    // 🔹 Préparer l’email
    const subject = "Response to your Job Application";

    let htmlMessage = `
      <h2>Hello ${app.id_user.firstName} ${app.id_user.lastName},</h2>
      <p>We hope you are doing well.</p>
    `;

    if (app.status === "accepted") {
      htmlMessage += `
        <p>🎉 Congratulations! Your application for the position of 
        <strong>${app.id_post.title}</strong> has been <strong style="color:green;">accepted</strong>.</p>
        <p>Our HR team will contact you soon with the next steps.</p>
      `;
    } else if (app.status === "rejected") {
      htmlMessage += `
        <p>We appreciate your interest in the position of 
        <strong>${app.id_post.title}</strong>, but unfortunately your application has been 
        <strong style="color:red;">rejected</strong>.</p>
        <p>We encourage you to apply for future opportunities at our company.</p>
      `;
    }

    htmlMessage += `
      <p>Best regards,<br/>Recruitment Team</p>
    `;

    console.log("Email HTML:", htmlMessage);

    // 🔹 Envoyer l’email
    const emailSent = await sendEmailTo(app.id_user.email, subject, htmlMessage);

    if (!emailSent) {
      console.warn("Email sending failed for:", app.id_user.email);
    }

    // 🔹 Retourner la réponse
    return res.status(200).json({
      message: "Application updated successfully",
      data: app,
      emailSent: !!emailSent
    });

  } catch (error) {
    console.error("Error updating application:", error);
    return res.status(500).json({ error: error.message });
  }
};










module.exports = {addApplication,getAllAppsByPostID,getAppByID,updateApplication}