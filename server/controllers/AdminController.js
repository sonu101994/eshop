const AdminModel=require("../models/AdminModel");
const bcrypt = require("bcrypt");
const jwt=require("jsonwebtoken");
const {message}=require("../library/helper");

// register admin users
const register = async (req, res) => {
    try {

        const { name, email, password, role } = req.body;

        if (!name || !email || !password || role == undefined) {
            return res.send(message.general_error("all fields required"));
        }
        

        const adminExists = await AdminModel.findOne({ email });

        if (adminExists) {
            return res.send(message.general_error("admin already exists"));
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await AdminModel.create({
            name,
            email,
            password: hashedPassword,
            role
        });

        return res.send(message.general_success("registered successfully"));

    } catch (error) {
        return res.send(message.catch_error);
    }
};




// login admin
const login = async (req, res) => {
    try {

        const { email, password } = req.body;

        if (!email || !password) {
            return res.send(message.general_error("email and password are required to login"));
        }

        const admin = await AdminModel.findOne({ email });

        if (!admin) {
            return res.send(message.general_error("admin not found"));
        }

        const isMatch = await bcrypt.compare(password, admin.password);

        if (!isMatch) {
            return res.send(message.general_error("password incorrect"));
        }

        const token = jwt.sign(
            { id: admin._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        return res.send({
            flag: 1,
            msg: "Login successful",
            token,
            data: {
                id: admin._id,
                name: admin.name,
                email: admin.email,
                role: admin.role
            }
        });

    } catch (error) {
        return res.send(message.catch_error);
    }
};


module.exports = { register, login};