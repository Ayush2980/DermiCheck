const jwt = require("jsonwebtoken");
const createError = require("http-errors");
const RTSecret = process.env.RTS || "78887"
const ATSecret = process.env.ATS || "78889"
module.exports = {
    verifyJWT  : async(token , type) => {
        try {
            const publicKey = (type == 1) ? RTSecret : ATSecret;
            const decoded = await jwt.verify(token, publicKey);
            return { payload: decoded, expired: false };
          } catch (error) {
            return { payload: null, expired: true };
          }
    },
    signJWT : async function(userId , type){
        try{
            const secret = (type == 1) ? RTSecret : ATSecret; 
            const expiry = (type == 1) ? '3600s' : '600s'; 
            const payload = {
                _id : userId ,
                login : Date.now()
            }
            const options = {
                expiresIn : expiry
            }
            const token = jwt.sign(payload , secret , options)
            return token;
        }
        catch(e){
            return e;
        }
    }
}