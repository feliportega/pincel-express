const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient();
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const JWT_SECRECT = process.env.JWT_SECRECT;

//Registro
exports.register = async (req,res) => {
    const { nombre, email, password} = req.body;

    try{
        const existe = await prisma.usuario.findUnique({where: { email }});
        if (existe) return res.status(400).json({ msg: "El email ya existe"});

        const hashed = await bcrypt.hash(password, 10);

        const usuario = await prisma.usuario.create({
            data: { nombre, email, password: hashed},
        });

        res.json({ msg:"Usuario registrado"});
    }catch (error) {
        res.status(500).json({ error: error.message});
    }
};

//Login
exports.login = async (req,res) => {
    const { email, password} = req.body;

    try {
        const usuario = await prisma.usuario.findUnique({ where: { email}});
        if (!usuario) return res.status(400).json({ msg: "Credenciales invalidas"})

            const valid = await bcrypt.compare(password,usuario.password);
            if (!valid) return res.status(400).json({msg: "Contraseña incorrecta"});

            const token = jwt.sign(
                { id: usuario.id, email: usuario.email},
                JWT_SECRECT,
                { expiresIn: "2h"}
            );
            res.json({ msg:"Login exitoso", token})
    } catch (error) {
        res.status(500).json({ msg:"error", error: error.message});
    }
};

exports.delete = async (req,res) => {
    const userId = req.user.id;
    try{
        await prisma.usuario.delete({
            where:{id: userId}
        });
        res.json({msg:"usuario eliminado"});

    } catch(error){
        res.status(500).json({error: error.message})
    }
}