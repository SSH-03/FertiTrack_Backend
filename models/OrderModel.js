import mongoose from "mongoose";
import { productSchema } from "./ProductModel.js";

const paymentSchema = new mongoose.Schema(
    {
        amount: { type: Number, required: true },
        mode: { type: String, required: true },
        status: { type: String, default: "Pending" },
        date: { type: Date, default: Date.now },
    },
    { _id: false }
);

const orderScheme = new mongoose.Schema({
    id: { type: Number, required: true },
    orderId: { type: String, required: true },
    userId: { type: String, required: true },

    customer: { type: Object, required: true },

    balance: { type: Number, required: true },

    billingSummary: {
        total: Number,
        discountType: String,
        discountAmount: Number,
        finalTotal: Number,
    },

    products: {
        type: [productSchema],
        required: true,
    },

    payments: {
        type: [paymentSchema],
        default: [],
    },

    status: { type: String, default: "Pending" },

    ordercanceled: { type: Boolean, default: false },

    date: { type: Date, default: Date.now },
});

const orderModel = mongoose.models.order || mongoose.model("order", orderScheme);

export default orderModel;
