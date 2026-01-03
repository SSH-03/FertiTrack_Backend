import orderModel from "../models/OrderModel.js";
// import userModel from "../models/UserModel.js";
import productModel from "../models/ProductModel.js";

const convertToKg = (value, type) => {
    if (type === "g") return value / 1000;
    if (type === "kg") return value;
    if (type === "ton") return value * 1000;
    throw new Error("Invalid quantity type");
};

const placeOrder = async (req, res) => {
    try {
        const lastOrder = await orderModel.findOne().sort({ id: -1 });
        const id = lastOrder ? lastOrder.id + 1 : 1;

        // Reduce stock
        for (const item of req.body.products) {
            const product = await productModel.findById(item.productId);

            if (!product) {
                return res.json({
                    success: false,
                    message: "Product not found",
                });
            }

            const orderedKg = convertToKg(
                item.orderQuantity,
                item.orderQuantityType
            );

            const productKg = convertToKg(
                product.quantity,
                product.quantityType
            );

            if (orderedKg > productKg) {
                return res.json({
                    success: false,
                    message: `Insufficient stock for ${product.name}`,
                });
            }

            const remainingKg = productKg - orderedKg;

            // convert back to product unit
            if (product.quantityType === "g")
                product.quantity = remainingKg * 1000;

            if (product.quantityType === "kg") product.quantity = remainingKg;

            if (product.quantityType === "ton")
                product.quantity = remainingKg / 1000;

            await product.save();
        }

        // Save order snapshot
        const newOrder = new orderModel({
            id,
            orderId: "FertiTrackOrder-" + id,
            userId: req.body.userId,
            customer: req.body.customer,
            balance: req.body.balance,
            billingSummary: req.body.billingSummary,
            products: req.body.products,
            payments: req.body.payments || [],
            status: req.body.status || "Pending",
        });

        await newOrder.save();

        res.json({ success: true, message: "Order saved successfully" });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
};


const listOrders = async (req, res) => {
    
    try {
        const orders = await orderModel.find({});
        res.json({ success: true, data: orders.reverse() });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

const cancelOrder = async (req, res) => {
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId, {
            ordercanceled: req.body.ordercanceled,
        });

        res.json({ success: true, message: "Canceled Order" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};


const payInstallment = async (req, res) => {
    try {
        const { orderId, amount, mode } = req.body;

        const order = await orderModel.findById(orderId);

        // if (!order) {
        //     return res.json({ success: false, message: "Order not found" });
        // }

        // if (order.ordercanceled) {
        //     return res.json({
        //         success: false,
        //         message: "Canceled order cannot accept payment",
        //     });
        // }

        if (amount > order.balance) {
            return res.json({   
                success: false,
                message: "Amount greater than balance",
            });
        }

        order.payments.push({
            amount,
            mode,
            status: "Pending",
            date: new Date(),
        });

        order.balance = order.balance - amount;
        await order.save();

        res.json({ success: true, message: "Payment added" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

export { placeOrder, listOrders, cancelOrder, payInstallment };
