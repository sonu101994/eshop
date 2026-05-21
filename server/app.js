const express = require("express");

const cors = require("cors");
const path = require("path");
const fileUpload = require("express-fileupload");
const app=express();

const AdminRouter=require("./routers/AdminRouter");
const CategoryRouter=require("./routers/CategoryRouter");
const BrandRouter=require("./routers/BrandRouter");
const ColorRouter=require("./routers/ColorRouter");
const ProductRouter=require("./routers/ProductRouter");



app.use(express.json({ limit: "10mb" })); //parser
app.use(express.urlencoded({ extended: true }));
app.use(
    fileUpload({
        createParentPath: true,
    })
);


// app.use(express.static("public"));
app.use(express.static(path.join(__dirname,"public")));
app.use(cors(
    {
       origin:process.env.CLIENT_URL,
        credentials: true
    }
));


// testing api

app.get("/", (req, res) => {
    res.status(200).json(
        {
            success: true,
            message: "API running successfully"
        }
    );
});



app.use("/api/admin",AdminRouter)
app.use("/api/category",CategoryRouter);
app.use("/api/brand",BrandRouter);
app.use("/api/color",ColorRouter);
app.use("/api/product",ProductRouter);

module.exports = app;