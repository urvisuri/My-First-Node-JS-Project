const { checkForAuthenticationCookie } = require("./middleware/authentication");
const mongoose=require("mongoose");
const path=require("path");
const express = require ("express");
const cookiePaser =require('cookie-parser');
const Blog=require('./models/blog');

const userRoute = require('./routes/user');
const blogRoute = require('./routes/blog');

const app =express();
const PORT = process.env.PORT||1000;

mongoose.connect("mongodb://localhost:27017/YOUTUBE-BLOG ").then(e=> console.log('mongoDB Connected'));


app.set('view engine','ejs');
app.set('views',path.resolve("./views"));

app.use(express.urlencoded({ extended: false}));
app.use(cookiePaser());
app.use(checkForAuthenticationCookie("token"));
app.use(express.static(path.resolve("./public")));


app.get("/",async (req,res)=>{
    const allBlogs = await Blog.find({});
    res.render("home",{
        user:req.user,
        blogs: allBlogs
    });
});


app.use('/user',userRoute);
app.use('/blog',blogRoute);

app.listen(PORT,() => console.log(`server started at PORT:${PORT}`));