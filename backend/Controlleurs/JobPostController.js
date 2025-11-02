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



// Récupérer tous les Job Posts non supprimés
const getAllJobPosts = async (req, res) => {
    try {
        const jobPosts = await JobPostModel.find({ isDeleted: false }) // 🔹 filtrer uniquement les posts non supprimés
            .populate("id_employee", "-__v"); // Info sur l'employé sans champs techniques

        return res.status(200).json({ message: "Job posts retrieved", data: jobPosts });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};


const getAllPostsByIdEmployee = async (req, res) => {
    try {
        const {id_employee} = req.params
        const employee = EmployeeModel.findById(id_employee)
        if(!employee) {
            return res.status(500).json({message : "employee not found"})
        }
        const jobPosts = await JobPostModel.find({id_employee, isDeleted: false}) // 🔹 filtrer uniquement les posts non supprimés
            .populate("id_employee", "-__v"); // Info sur l'employé sans champs techniques
        return res.status(200).json({ message: "Job posts :", data: jobPosts });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};



const getJobPostDetailsById = async (req, res) => {
    try {
        const jobPostId = req.params.id
        const jobPostDetails = await JobPostModel.findById(jobPostId).populate("id_employee", "-__v");
        return res.status(200).json({ message: "Job posts details", data: jobPostDetails });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};



// updateJobPost
const updatePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const { title, description, mission, requirements, endDate, location, id_employee } = req.body;

    // Vérifier que le post existe
    const post = await JobPostModel.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Job post not found" });
    }

    // Si id_employee est fourni, vérifier qu'il existe
    if (id_employee && id_employee !== String(post.id_employee)) {
      const employee = await EmployeeModel.findById(id_employee);
      if (!employee) {
        return res.status(404).json({ message: "Employee not found" });
      }
      post.id_employee = id_employee;
    }

    // Mettre à jour les champs
    if (title !== undefined) post.title = title;
    if (description !== undefined) post.description = description;
    if (mission !== undefined) post.mission = mission;
    if (requirements !== undefined) post.requirements = requirements;
    if (endDate !== undefined) post.endDate = endDate;
    if (location !== undefined) post.location = location;

    await post.save();

    return res.status(200).json({ message: "Job post updated successfully", jobPost: post });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};



const deletePost = async (req,res) => {
    try {
        const postId = req.params.id
        const postToDelete = await JobPostModel.findById(postId)
        
        if (!postToDelete) {
            return res.status(404).json({ message: "post not found" });
        }

        await postToDelete.updateOne({isDeleted: true})
        return res.status(200).json({ message: "post deleted with success" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}











module.exports = { createJobPost, getAllJobPosts,getJobPostDetailsById ,updatePost,deletePost,getAllPostsByIdEmployee};



