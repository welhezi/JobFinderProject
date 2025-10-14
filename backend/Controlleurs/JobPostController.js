const JobPostModel = require("../Models/JobPostModel");
const EmployeeModel = require("../Models/EmployeeModel");

// add new Job Post 
const createJobPost = async (req, res) => {
    try {
        const { title, description, mission, requirements, endDate, location, id_employee } = req.body;

        // Vérifier les champs obligatoires
        if (!title || !id_employee) {
            return res.status(400).json({ message: "Title and employee ID are required" });
        }

        // Vérifier que l'employé existe
        const employee = await EmployeeModel.findById(id_employee);
        if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
        }

        // Créer le Job Post
        const newJobPost = new JobPostModel({
            title,
            description,
            mission,
            requirements,
            endDate,
            location,
            id_employee
        });

        await newJobPost.save();

        // Ajouter le job dans le tableau jobs de l'employee
        employee.jobs.push(newJobPost._id);
        await employee.save();

        return res.status(201).json({ message: "Job post created successfully", jobPost: newJobPost });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};













// Récupérer tous les Job Posts
const getAllJobPosts = async (req, res) => {
    try {
        const jobPosts = await JobPostModel.find()
            .populate("id_employee", "-__v"); // Info sur l'employé sans champs techniques

        return res.status(200).json({ message: "Job posts retrieved", data: jobPosts });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

module.exports = { createJobPost, getAllJobPosts };
