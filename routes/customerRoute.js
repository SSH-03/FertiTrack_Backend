import express from "express";
import {
    addCustomer,
    getCustomers,
    updateCustomer,
    deleteCustomer,
} from "../controllers/customerController.js";

const customerRouter = express.Router();

customerRouter.post("/add", addCustomer);
customerRouter.get("/list", getCustomers);
customerRouter.put("/update/:id", updateCustomer);
customerRouter.delete("/delete/:id", deleteCustomer);

export default customerRouter;
