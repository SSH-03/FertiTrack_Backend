// npm run server
import express from "express";
import cors from "cors";

//app config
const app = express();
const port = 4000;

// middleware
app.use(express.json()); // - when every we get the request from frontend to backend that will be parsed using this json

app.use(cors()) // - using this we can access the backend form any frontend

app.get("/", (req,res)=>{
    res.send("Fertitrack API Working")
})

app.listen(port,()=>{
    console.log(`Server Strated on http://localhost:${port}`)
})