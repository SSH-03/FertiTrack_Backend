import mongoose from "mongoose";

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


const orderProductSchema = new mongoose.Schema(
    {
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "product",
            required: true,
        },

        name: { type: String, required: true },
        image: { type: String }, // optional
        description: { type: String }, // optional

        orderQuantity: {
            type: Number,
            required: true,
        },

        orderQuantityType: {
            type: String,
            enum: ["g", "kg", "ton"],
            required: true,
        },

        baseUnitPrice: {
            type: Number,
            required: true,
        },

        effectiveUnitPrice: {
            type: Number,
            required: true,
        },

        totalPrice: {
            type: Number,
            required: true,
        },

        next_dose: { type: Number },
        dose_measure: {
            type: String,
            enum: ["day", "week", "month", "year"],
        },

        nextDoseDate: { type: Date },
        nextDosePretty: { type: String },
    },
    { _id: false }
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
            type: [orderProductSchema],
            required: true,
        },

        payments: [
            {
                amount: Number,
                mode: String,
                status: String,
                date: Date,
            },
        ],

        status: { type: String, default: "Pending" },

        ordercanceled: { type: Boolean, default: false },

        date: { type: Date, default: Date.now },
    },
    { timestamps: true }
);

const orderModel =
    mongoose.models.order || mongoose.model("order", orderScheme);

export default orderModel;
