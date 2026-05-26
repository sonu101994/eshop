require("dotenv").config();
const mongoose = require("mongoose");
const app = require("../app");

let cached = global.mongooseConnection;

if (!cached) {
    cached = global.mongooseConnection = { conn: null, promise: null };
}

async function connectDB() {
    if (cached.conn) return cached.conn;

    if (!cached.promise) {
        cached.promise = mongoose.connect(process.env.MONGODB_URI);
    }

    cached.conn = await cached.promise;
    return cached.conn;
}

app.use(async (req, res, next) => {
    try {
        await connectDB();
        next();
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "database connection failed",
            error: error.message,
        });
    }
});

module.exports = app;
