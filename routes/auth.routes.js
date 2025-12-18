const express = require("express");
const router = express.Router();
const { register, login, eliminar } = require("../controllers/auth.controller");
const auth = require("../middleware/auth.middleware")

router.post("/register", register);
router.post("/login", login);
router.post("/eliminar", eliminar)

//ruta protegida
router.get("/perfil", auth, (req,res) => {
    res.json({ msg:"Acceso permitido", user: req.user});
})

module.exports = router