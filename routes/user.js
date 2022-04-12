const router = require("express").Router();

router.get("/usertest", (req,res) => {
    res.send("User test is successful!");
}); 

router.post("/userposttest", (req,res) => {
    const username = req.body.username;
    res.send("Your username is: " + username);
});

module.exports = router;

/* CREACIÓN DE RUTAS. Uso un puerto para verificar que exista la comunicación correcta con cada endpoint al hacer las peticiones al servidor. 
Para probarlo puedo ir al navegador y escribir ---> http://localhost:5000/api/test */