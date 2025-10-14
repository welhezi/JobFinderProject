const express = require("express");
const router = express.Router();

const employeeController = require("../Controlleurs/employeeController");

// Créer un employé
router.post("/add", employeeController.createEmployee);

// Récupérer tous les employés (pour test)
router.get("/getall", employeeController.getAllEmployees);

module.exports = router;
