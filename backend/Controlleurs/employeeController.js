const EmployeeModel = require("../Models/EmployeeModel");
const UserModel = require("../Models/UserModel");
const JobPostModel = require("../Models/JobPostModel");
const bcrypt = require("bcrypt");


// Créer un nouvel employé
const createEmployee = async (req, res) => {
    try {
        const { firstName, lastName, email, cv, address, birthday, civility, image, password, company, description } = req.body;

        // Vérifier les champs obligatoires
        if (!firstName || !lastName || !email || !password || !company) {
            return res.status(400).json({ message: "User attributes are required" });
        }

        // Vérifier si l'utilisateur existe déjà par email
        let existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User with this email already exists" });
        }

        // Hacher le mot de passe
        const hashedPass = await bcrypt.hash(password, 10);
        
        // Créer l'employé directement avec le discriminator
        const newEmployee = await EmployeeModel.create({
            firstName,
            lastName,
            email,
            password:hashedPass,
            cv,
            address,
            birthday,
            civility,
            image,
            company,
            description,
            //role: "employee"
        });

        return res.status(201).json({ 
            message: "Employee created successfully", 
            employee: newEmployee 
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

module.exports = { createEmployee, getAllEmployees };
