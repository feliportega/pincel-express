const jwt = require("jsonwebtoken");
const JWT_SECRECT = process.env.JWT_SECRECT;

module.exports = (req,res, next) => {
    const token = req.headers["authorization"];

    if (!token)
        return res.status(401).json({ msg: "Token requerido"});

    try {
        const decoded = jwt.verify(token.split(" ")[1], JWT_SECRECT);
        req.user = decoded;
        next()
    } catch (error) {
        res.status(401).json({ msg:" token invalido o expirado"})
    }
};