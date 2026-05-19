const express = require("express");
const helmet = require("helmet");
const compression = require("compression");
const cors = require("cors");
const path = require("path");
const fileUpload = require("express-fileupload");
const app=express();



app.use(helmet());// security middleware
app.use(compression());// compression
app.use(express.static(path.join(__dirname, "public")));// static folder
app.use(cors(
    {
        origin: process.env.CLIENT_URL,
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

app.use(
    fileUpload({
        createParentPath: true,
    })
);


module.exports = app;