const express = require('express');
const { connection } = require('./Config/db');
const { userRoute } = require('./Routes/routes.user');
const { blacklist } = require('./Config/blacklist');
const { pictureRoute } = require('./Routes/routes.picture');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use('/users',userRoute);
app.use('/pictures',pictureRoute)

app.get('/logout',(req,res)=> {
    const token = req.headers.authorization?.split(" ")[1];
    blacklist.push(token);
    res.status(200).send({msg:"Logout successsful"});
})
app.listen(process.env.PORT, async ()=> {
    await connection;
    console.log(`server is running at http://localhost:${process.env.PORT}`)
})