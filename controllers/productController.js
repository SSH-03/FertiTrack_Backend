import { log } from "console";
import productModel from "../models/ProductModel.js";
import fs from "fs";

// add product
const addProduct = async (req, res) => {
    let image_filename = `${req.file.filename}`;
    const product = new productModel({
        name: req.body.name,

        image: image_filename,
        next_dose: req.body.next_dose,
        dose_measure: req.body.dose_measure,
        unitprice: req.body.unitprice,
        quantityType: req.body.quantityType,

        quantity: req.body.quantity,
        description: req.body.description,
    });

    try {
        await product.save();
        res.json({ success: true, message: "Food Added" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

// All Products list
const listProduct = async (req, res) => {
    try {
        const products = await productModel.find({});
        res.json({ success: true, data: products });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

//Remove Product Item
const removeProduct = async (req, res) => {
    try {
        const product = await productModel.findById(req.body.id);
        fs.unlink(`uploads/${product.image}`, () => {}); // Delete mentioned image form uploads folder

        await productModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Product Removed" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

export { addProduct, listProduct, removeProduct };
