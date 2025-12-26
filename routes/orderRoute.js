import express from "express";
import authMiddleware from "../middleware/auth.js";
import {
    cancelOrder,
    listOrders,
    placeOrder,
    payInstallment,
} from "../controllers/orderController.js";

// using this express we create router
const orderRouter = express.Router();

orderRouter.post("/place", authMiddleware, placeOrder);
orderRouter.get("/list", listOrders);
orderRouter.post("/cancelorder", cancelOrder);
orderRouter.post("/pay-installment", payInstallment);


export default orderRouter;
