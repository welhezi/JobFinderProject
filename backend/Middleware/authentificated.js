const jwt = require("jsonwebtoken")
const secret = process.env.ACCESS_TOKEN_KEY

module.exports = (req,res ,next) => {
    const authHeader = req.headers.authorization

    if(!authHeader){
        return res.status(401).json({message: "token absent"})
    }

    const token = authHeader.split(" ")[1]
    try {
        const decoded=jwt.verify(token,secret)
        req.user = decoded
        next()
    } catch (error) {
        return res.status(403).json({message: "token invalide"})
    }

}