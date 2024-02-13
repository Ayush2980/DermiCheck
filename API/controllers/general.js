module.exports = {
    homePage : (req , res) => {
        console.log("Hit");
        if(req.user) return res.send({Hello : "Hello from Backend !!!" , user : req.user});
        else return res.send({Hello : "Hello from Backend !!!"})
    }
}