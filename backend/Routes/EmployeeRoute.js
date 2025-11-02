const express = require("express");
const router = express.Router();

const employeeController = require("../Controlleurs/employeeController");
const upload = require("../Middleware/upload");
const authentificated = require("../Middleware/authentificated");

// Créer un employé
router.post("/add",upload.single("image"), employeeController.createEmployee);

// Récupérer tous les employés (pour test)
router.get("/getall", employeeController.getAllEmployees);
router.put("/:id", upload.single("image"),authentificated, employeeController.updateEmployee);

module.exports = router;
