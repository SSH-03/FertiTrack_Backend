import orderModel from "../models/OrderModel.js";
// import userModel from "../models/UserModel.js";

const placeOrder = async (req, res) => {
    const orders = await orderModel.find({});
    let id;
    if (orders.length > 0) {
        let last_order_array = orders.slice(-1);
        let last_order = last_order_array[0];
        id = last_order.id + 1;
    } else {
        id = 1;
    }

    try {
        const newOrder = new orderModel({
            id: id,
            orderId: "FertiTrackOrder-" + id,
            userId: req.body.userId,
            customer: req.body.customer,
            balance: req.body.balance,
            billingSummary: req.body.billingSummary,
            products: req.body.products,
            payments: req.body.payments,
            status: req.body.status,
        });

        await newOrder.save();
        // it will save the order in our database
        // after placing the order we should cler the user cart
        // await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });
        res.json({ success: true, message: "Order saved" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

const listOrders = async (req, res) => {
    // create logic to get all details of user details
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
