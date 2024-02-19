const jwt = require('jsonwebtoken');
const { blacklist } = require('../Config/blacklist');

const auth = (req,res,next)=> {
    const token = req.headers.authorization?.split(" ")[1];

    if(blacklist.includes(token)) {
        res.status(400).send({msg:"please login again"})
    } else {
        try{
            jwt.verify(token,'secret',(err,decoded)=> {
               if(decoded) {
                   req.body.userId = decoded.userId;
                   next();
               } else {
                   res.status(400).send({msg:"not authenticated"})
               }
            })
       } catch(err) {
           res.status(400).send({err})
       }
    }
   
}

module.exports = {auth};