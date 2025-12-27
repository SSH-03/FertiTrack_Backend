// npm run server
import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import productRouter from "./routes/productRoute.js";
import "dotenv/config.js";
import userRouter from "./routes/userRoute.js";
import orderRouter from "./routes/orderRoute.js";
import customerRouter from "./routes/customerRoute.js";

//app config
const app = express();
const port = 4000;

// middleware
app.use(express.json()); // - when every we get the request from frontend to backend that will be parsed using this json

app.use(cors()); // - using this we can access the backend form any frontend

// db connection
connectDB();

// API endpoint
app.use("/api/product", productRouter);
app.use("/images", express.static("uploads"));
app.use("/api/user", userRouter);
app.use("/api/order", orderRouter);
app.use("/api/customer", customerRouter);

app.get("/", (req, res) => {
    res.send("Fertitrack API Working");
});

app.listen(port, () => {
    console.log(`Server Started on http://localhost:${port}`);
});

// mongodb+srv://Fertitrack:<db_password>@cluster0.fjj0l1y.mongodb.net/?appName=Cluster0
// mongodb+srv://Fertitrack:<db_password>@cluster0.fjj0l1y.mongodb.net/?
