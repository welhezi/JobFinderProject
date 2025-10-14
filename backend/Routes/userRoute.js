const express = require("express")
const userController = require("../Controlleurs/userController") 
const authentificated = require("../Middleware/authentificated")
const upload = require("../Middleware/upload")


const router = express.Router()
router.post("/register",userController.register)
router.post("/login",userController.login)
router.post("/logout",userController.logout)
router.get("/getUserProfile",authentificated,userController.getUserProfile)
router.put("/updateUserProfile",upload.single("image"),authentificated,userController.updateProfile)
router.delete("/del/:id",authentificated,userController.deleteUser)
router.post("/forgetpass",userController.forgetPassword)
router.post("/resetpass/:token", userController.resetPassword);
module.exports = router