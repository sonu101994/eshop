const express=require("express");
const AuthAdmin=require("../middleware/AuthAdmin");

const AdminRouter=express.Router();

const {register,login}=require("../controllers/AdminController")

// auth
AdminRouter.post("/register",AuthAdmin([0]),register);
AdminRouter.post("/login",login);





module.exports=AdminRouter;