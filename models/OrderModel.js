import mongoose from "mongoose";
import { productSchema } from "./ProductModel.js";


const customerSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        phone: {
            type: Number,
            required: true,
        },
        village: {
            type: String,
            default: "",
        },
    },
    { timestamps: true }
);

const paymentSchema = new mongoose.Schema(
    {
        amount: { type: Number, required: true },
        mode: { type: String, required: true },
        status: { type: String, default: "Pending" },
        date: { type: Date, default: Date.now },
    },

    { timestamps: true }
);

const orderScheme = new mongoose.Schema(
    {
        id: { type: Number, required: true },
        orderId: { type: String, required: true },
        userId: { type: String, required: true },

        customer: { type: customerSchema, required: true },

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
    },
    { timestamps: true }
);

const orderModel = mongoose.models.order || mongoose.model("order", orderScheme);

export default orderModel;
