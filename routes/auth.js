const router = require("express").Router();
const User = require("../models/User");
// importo librería de Crypto JS para encriptar las contraseñas de usuario
const CryptoJS = require("crypto-js");
// importo JWT para mayores medidas de seguridad usando un token
const jwt = require("jsonwebtoken");

// REGISTER
router.post("/register", async (req, res)=> {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(
            req.body.password, 
            process.env.PASS_SEC).toString(),
    }); 

    try{
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(500).json(err);
    }
    
});

// LOGIN FUNCTION
router.post("/login", async (req, res)=>{
    try{
        const user = await User.findOne({username: req.body.username});
        // si no se encuentra un usuario con el nombre ingresado:
        !user && res.status(401).json("Wrong credentials!")

        const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC
        );
        const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
        // si la contraseña no coincide:
        OriginalPassword !== req.body.password && res.status(401).json("Wrong credentials!");
        
        // se crea el objeto que agrega el token de JWT al objeto original del user
        const accessToken = jwt.sign(
            {
                id:user._id, 
                isAdmin: user.isAdmin,
            }, 
            process.env.JWT_SEC,
            {expiresIn:"3d"}
        );
        
        // El formato _doc es propio de MongoDB y siempre guarda los documentos en dicho folder 
        const { password, ...others } = user._doc;

        // Si los datos de usuario y contraseña están correctos: 
        res.status(200).json({...others, accessToken});
    }catch(err){
        res.status(500).json(err);
    }
});

module.exports = router;