import productModel from "../models/ProductModel.js";
import fs from "fs";
import path from "path";

/* ================= ADD PRODUCT ================= */
const addProduct = async (req, res) => {
    try {
        if (!req.file) {
            return res.json({ success: false, message: "Image is required" });
        }

        const product = new productModel({
            name: req.body.name,
            image: req.file.filename,
            next_dose: req.body.next_dose,
            dose_measure: req.body.dose_measure,
            unitprice: req.body.unitprice,
            quantityType: req.body.quantityType,
            quantity: req.body.quantity,
            description: req.body.description,
        });

        await product.save();
        res.json({ success: true, message: "Product added successfully" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Failed to add product" });
    }
};

/* ================= LIST PRODUCTS ================= */
const listProduct = async (req, res) => {
    try {
        const products = await productModel.find({});
        res.json({ success: true, data: products });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Failed to fetch products" });
    }
};

/* ================= UPDATE PRODUCT ================= */
// UPDATE PRODUCT
const updateProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await productModel.findById(productId);

        if (!product) {
            return res.json({ success: false, message: "Product not found" });
        }

        // if new image uploaded
        if (req.file) {
            fs.unlink(`uploads/${product.image}`, () => {});
            product.image = req.file.filename;
        }

        product.name = req.body.name;
        product.next_dose = req.body.next_dose;
        product.dose_measure = req.body.dose_measure;
        product.unitprice = req.body.unitprice;
        product.quantityType = req.body.quantityType;
        product.quantity = req.body.quantity;
        product.description = req.body.description;

        await product.save();

        res.json({ success: true, message: "Product Updated" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Update Failed" });
    }
};


/* ================= DELETE PRODUCT ================= */
const removeProduct = async (req, res) => {
    try {
        const product = await productModel.findById(req.params.id);

        if (!product) {
            return res.json({ success: false, message: "Product not found" });
        }

        const imagePath = path.join("uploads", product.image);

        if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
        }

        await productModel.findByIdAndDelete(req.params.id);

        res.json({ success: true, message: "Product deleted successfully" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Product delete failed" });
    }
};

export { addProduct, listProduct, updateProduct, removeProduct };
