const EmployeeModel = require("../Models/EmployeeModel");
const UserModel = require("../Models/UserModel");
const JobPostModel = require("../Models/JobPostModel");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const { sendEmailTo } = require("../Utils/sendEmail");

// Créer un nouvel employé
const createEmployee = async (req, res) => {
  try {
    // Récupérer les champs texte
    const { firstName, lastName, email, cv, address, birthday, civility, company, description } = req.body;

    // Vérifier les champs obligatoires
    if (!firstName || !lastName || !email || !company) {
      return res.status(400).json({ message: "User attributes are required" });
    }

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User with this email already exists" });
    }

    // 🔹 Générer un mot de passe aléatoire
    const generatedPassword = crypto.randomBytes(6).toString('hex'); // ex: 12 caractères hexadécimaux

    // Hacher le mot de passe
    const hashedPass = await bcrypt.hash(generatedPassword, 10);

    // Récupérer le fichier image (optionnel)
    const imagePath = req.file ? req.file.filename : null;

    // Créer l'employé
    const newEmployee = await EmployeeModel.create({
      firstName,
      lastName,
      email,
      password: hashedPass,
      cv,
      address,
      birthday,
      civility,
      image: imagePath,
      company,
      description,
    });

    // 🔹 Préparer l’email
    const subject = "Your new employee account";

    const htmlMessage = `
      <h2>Hello ${newEmployee.firstName} ${newEmployee.lastName},</h2>
      <p>Your account has been created successfully. Here are your credentials:</p>
      <ul>
        <li><strong>Email:</strong> ${newEmployee.email}</li>
        <li><strong>Password:</strong> ${generatedPassword}</li>
      </ul>
      <p>Please change your password after your first login.</p>
    `;

    // 🔹 Envoyer l’email
    const emailSent = await sendEmailTo(newEmployee.email, subject, htmlMessage);
    if (!emailSent) {
      console.warn("Email sending failed for:", newEmployee.email);
    }

    return res.status(201).json({ 
      message: "Employee created successfully", 
      data: newEmployee 
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};


// Récupérer tous les employés
const getAllEmployees = async (req, res) => {
    try {
        const employees = await EmployeeModel.find().populate("jobs");
        return res.status(200).json({ message: "Employees retrieved", data: employees });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};



// Update Employee
const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    // Vérifier si l'employé existe
    const employee = await EmployeeModel.findById(id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    // Récupérer les données envoyées
    const { firstName, lastName, email, password, company, description, civility, address, birthday, cv } = req.body;

    // Préparer les données à mettre à jour
    const updatedData = {};

    if (firstName) updatedData.firstName = firstName;
    if (lastName) updatedData.lastName = lastName;
    //if (email) updatedData.email = email;
    if (company) updatedData.company = company;
    if (description) updatedData.description = description;
    if (civility) updatedData.civility = civility;
    if (address) updatedData.address = address;
    if (birthday) updatedData.birthday = birthday;
    if (cv) updatedData.cv = cv;

    // 🔹 Vérifier l'unicité de l'email avant mise à jour
    if (email && email.trim() !== "") {
      const existingUser = await UserModel.findOne({ email: email.trim() });

      // Si un autre utilisateur possède déjà cet email (autre que celui en cours)
      if (existingUser && existingUser._id.toString() !== id) {
        return res.status(400).json({ message: "This email is already in use" });
      }

      updatedData.email = email.trim();
    }

    // Si un fichier (image) est envoyé
    if (req.file) {
      updatedData.image = `${req.file.filename}`;
    }

    // Si un nouveau mot de passe est fourni → on le hache
    if (password && password.trim() !== "") {
      const hashedPass = await bcrypt.hash(password, 10);
      updatedData.password = hashedPass;
    }

    // Mettre à jour l'employé
    const updatedEmployee = await EmployeeModel.findByIdAndUpdate(id, updatedData, { new: true }).select("-password");

    return res.status(200).json({
      message: "Employee updated successfully",
      data: updatedEmployee,
    });
  } catch (error) {
    console.error("Error updating employee:", error);
    return res.status(500).json({ error: error.message });
  }
};



module.exports = { createEmployee, getAllEmployees,updateEmployee };
