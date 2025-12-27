import customerModel from "../models/CustomerModel.js";

const addCustomer = async (req, res) => {
    try {
        const { name, phone, village } = req.body;

        // validation
        if (!name || name.trim().length < 3) {
            return res.json({ success: false, message: "Valid name required" });
        }

        if (!phone || !/^[6-9]\d{9}$/.test(phone)) {
            return res.json({
                success: false,
                message: "Valid phone required",
            });
        }

        const exists = await customerModel.findOne({ phone });
        if (exists) {
            return res.json({
                success: false,
                message: "Phone already exists",
            });
        }

        const customer = await customerModel.create({
            name: name.trim(),
            phone,
            village: village?.trim() || "",
        });

        res.json({ success: true, message: "Customer added", customer });
    } catch (error) {
        res.json({ success: false, message: "Server error" });
    }
};

const updateCustomer = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, phone, village } = req.body;

        if (!name || name.trim().length < 3) {
            return res.json({ success: false, message: "Valid name required" });
        }

        if (!phone || !/^[6-9]\d{9}$/.test(phone)) {
            return res.json({
                success: false,
                message: "Valid phone required",
            });
        }

        const phoneExists = await customerModel.findOne({
            phone,
            _id: { $ne: id },
        });

        if (phoneExists) {
            return res.json({
                success: false,
                message: "Phone already used",
            });
        }

        await customerModel.findByIdAndUpdate(id, {
            name: name.trim(),
            phone,
            village: village?.trim() || "",
        });

        res.json({ success: true, message: "Customer updated" });
    } catch (error) {
        res.json({ success: false, message: "Server error" });
    }
};

const deleteCustomer = async (req, res) => {
    try {
        const { id } = req.params;

        await customerModel.findByIdAndDelete(id);

        res.json({ success: true, message: "Customer deleted" });
    } catch (error) {
        res.json({ success: false, message: "Server error" });
    }
};

const getCustomers = async (req, res) => {
    try {
        const customers = await customerModel.find().sort({ createdAt: -1 });

        res.json({
            success: true,
            customers,
        });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Server error" });
    }
};

export { addCustomer, updateCustomer, deleteCustomer, getCustomers };
