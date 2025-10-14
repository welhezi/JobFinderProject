const UserModel = require("../Models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { sendEmailTo } = require("../Utils/sendEmail");

// add nouvel utilisateur
const register = async (req, res) => {
    try {
        const { firstName, lastName, civility, birthday, email, password, address, role } = req.body;

        // Vérifier si l'utilisateur existe déjà
        const existing_user = await UserModel.findOne({ email });
        if (existing_user) {
            return res.status(400).json({ message: "Email already exists" });
        }

        // Hacher le mot de passe
        const hashedPass = await bcrypt.hash(password, 10);

        // Créer l'utilisateur
        const new_user = new UserModel({
            firstName,
            lastName,
            civility,
            birthday,
            email,
            password: hashedPass,
            address,
            role // default = "user"
        });

        await new_user.save();

        return res.status(201).json({ message: "New user added successfully", user: new_user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

let refreshTokens = []

// Connexion utilisateur
const login = async (req, res) => {
    try {
        const {email, password} = req.body;

        // Vérifier si l'email existe
        const user = await UserModel.findOne({email});
        if (!user) {
            return res.status(400).json({ message: "Email doesn't exist" });
        }

        // Vérifier le mot de passe
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Wrong password" });
        }

        // Générer les tokens
        const accessToken = generate_access_token(user);
        const refreshToken = generate_refresh_token(user);

        refreshTokens.push(refreshToken)

        return res.status(200).json({
            message: "Login successful",
            accessToken,
            refreshToken,
            user
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Générer access token
const generate_access_token = (user) => {
    return jwt.sign(
        { id: user._id, role: user.role },
        process.env.ACCESS_TOKEN_KEY,
        { expiresIn: "2h" }
    );
};

// Générer refresh token
const generate_refresh_token = (user) => {
    return jwt.sign(
        { id: user._id, role: user.role },
        process.env.REFRESH_TOKEN_KEY, 
        { expiresIn: "7d" } // Refresh token plus long
    );
};

//log out
const logout = async (req,res) => {
    const { refreshToken } = req.body
    if(!refreshToken){
       return res.status(400).json({ message: "not token provided" }); 
    }

    refreshTokens = refreshTokens.filter((token) => token !== refreshToken)
    return res.status(201).json({ message: "logout with success" }); 
};

// get user profile
const getUserProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await UserModel.findById(userId).select("-password");
        if (!user) {
            return res.status(404).json({ message: "user not found" });
        }
        return res.status(200).json({ message: "user profile:", data: user });
    } catch (error) {
        return res.status(500).json({ error: error });
    }
  
};


const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await UserModel.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { firstName, lastName, password, email, cv, address } = req.body;

    // 1️⃣ Créer un objet de mise à jour
    const updatedData = {
      firstName,
      lastName,
      cv,
      address,
    };

    // 2️⃣ Si l’email est fourni et non vide → on le remplace
    // sinon → on garde l'ancien email
    if (email && email.trim() !== "") {
      updatedData.email = email.trim();
    } else {
      updatedData.email = user.email;
    }

    // 3️⃣ Si une image est envoyée
    if (req.file) {
      updatedData.image = `/uploads/${req.file.filename}`;
    }

    // 4️⃣ Si le mot de passe est fourni → on le hache
    if (password && password.trim() !== "") {
      updatedData.password = await bcrypt.hash(password, 10);
    }

    // 5️⃣ Mettre à jour l’utilisateur
    const updatedUser = await UserModel.findByIdAndUpdate(userId,updatedData,{ new: true }).select("-password");

    return res.status(200).json({ message: "User updated successfully", data: updatedUser });
    
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};


const deleteUser = async (req,res) => {
    try {
        const userId = req.params.id
        const UserToDelete = await UserModel.findById(userId)
        
        if (!UserToDelete) {
            return res.status(404).json({ message: "User not found" });
        }

        await UserToDelete.updateOne({isDeleted: true})

        return res.status(200).json({ message: "User deleted with success" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}


const forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // Attendre la réponse de la requête MongoDB
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const token = jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN_KEY, { expiresIn: "1h" });
    user.resetToken = token;
    await user.save();

    const resetlink = `http://localhost:3000/reset-password/${token}`;
    const subject = "Reset Password";
    const htmlMessage = `
      <h2>Hello ${user.firstName} ${user.lastName}</h2>
      <p>Please use this link to reset your password:</p>
      <a href="${resetlink}">${resetlink}</a>
    `;

    const emailSent = await sendEmailTo(user.email, subject, htmlMessage);

    if (emailSent) {
      return res.status(200).json({ message: "Email sent successfully" });
    } else {
      return res.status(500).json({ message: "Failed to send email" });
    }

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { newPass } = req.body;
    const { token } = req.params;

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_KEY);
    const user = await UserModel.findById(decoded.id);

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const hashedPass = await bcrypt.hash(newPass, 10);
    user.password = hashedPass;
    user.resetToken = null;

    await user.save();

    return res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};




module.exports = { register, login, logout,getUserProfile,updateProfile,deleteUser,forgetPassword,resetPassword};





