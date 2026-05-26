const dotenv=require("dotenv");
dotenv.config();
const mongoose=require("mongoose");
const app=require("./app");


const PORT=process.env.PORT||5000;

mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log("Database successfully connected!");
}).catch(() => {
    console.log("Unable to connect DB!")
});

app.listen(
    PORT,
     () => {
    console.log(`Server running on port ${PORT}`);
});

// testing api
app.get("/", (req, res) => {
    res.json({
        message: "iShop API is running",
        status: true,
    });
});