import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    next_dose: { type: Number, required: true },
    dose_measure: { type: String, required: true },
    unitprice: { type: Number, required: true },
    quantityType: { type: String, required: true },
    quantity: { type: Number, required: true },
    description: { type: String, required: true },
});

const productModel = mongoose.models.product || mongoose.model("product", productSchema);

export default productModel;
export { productSchema };
