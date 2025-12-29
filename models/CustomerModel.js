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
            unique: true,
        },
        village: {
            type: String,
            default: "",
        },
    },
    { timestamps: true }
);

const customerModel =
    mongoose.models.customer || mongoose.model("customer", customerSchema);

export default customerModel;
