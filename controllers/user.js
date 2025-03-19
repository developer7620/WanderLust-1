const user=require("../models/user");
const User=require("../models/user");


module.exports.renderSignupForm=(req,res)=>{
    res.render("user/signup.ejs");
}


module.exports.signup=async(req,res)=>{
    try{
        let {username,email,password}=req.body;
    const newUser = new User({
        username,
        email,
    })
    const registeredUser=await User.register(newUser,password);
    req.login(registeredUser,(err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","Welcome to WanderLust!");
        res.redirect("/listings");
    });
    }
    catch(e){
        req.flash("error",e.message);
        res.redirect("/signup");
    }
}

module.exports.renderLoginForm=(req,res)=>{
    res.render("user/login.ejs");
}

module.exports.login=async(req,res)=>{

    req.flash("success","Welcome back!");
    if(req.session.redirectUrl){
        res.redirect(req.session.redirectUrl);
    }
    else res.redirect("/listings");
}

module.exports.logout=(req,res,next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","You are logged out!");
        res.redirect("/listings");
    })
}