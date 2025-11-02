const express = require("express");
const router = express.Router();
const applicationController = require("../Controlleurs/applicationController");
const authentificated = require("../Middleware/authentificated");
const upload = require("../Middleware/upload")

router.post("/add",authentificated,upload.single("cv"), applicationController.addApplication);
router.get("/get/:id",authentificated, applicationController.getAllAppsByPostID);
router.get("/getbyid/:id",authentificated, applicationController.getAppByID);
router.put("/:id",authentificated, applicationController.updateApplication );
module.exports = router