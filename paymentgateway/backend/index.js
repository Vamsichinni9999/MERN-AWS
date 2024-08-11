const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
require('dotenv').config()
const connectDB = require('./config/db')
const router = require('./routes')
const path = require("path");


const app = express()
app.use(cors({
    "origin": "*",
   
}))
app.use(express.json())
const _dirname = path.dirname("")
const buildpath = path.join(_dirname, "../frontend/build")
app.use(express.static(buildpath));
app.use(cookieParser())

app.use("/api", router)
app.use('/api/webhook', (req, res) => {
  res.status(200).send('Webhook received');
});

const PORT = 8080 || process.env.PORT


connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log("connnect to DB")
        console.log("Server is running "+PORT)
    })
})