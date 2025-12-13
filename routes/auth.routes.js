const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/auth.controller");
const auth = require("../middleware/auth.middleware")

router.post("/register", register);
router.post("/login", login);

//ruta protegida
router.get("perfil", auth, (req,res) => {
    res.json({ msg:"Acceso permitido", user: req.user});
})

module.exports = router