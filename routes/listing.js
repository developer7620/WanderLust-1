const express=require("express");
const router= express.Router();

const Listing= require("../models/listing.js");
const wrapAsync=require("../utils/wrapAsync.js");
const ExpressError=require("../utils/ExpressError.js");
const {listingSchema}=require("../schema.js");
const {isLoggedIn,isOwner,validateListing}=require("../middleware.js");
const listingController=require("../controllers/listing.js");
const multer  = require('multer');
const {storage}=require("../cloudConfig.js");
const upload = multer({ storage});

// Index and Create Route ====>>>>
router.route("/")
.get(wrapAsync(listingController.index))
.post(
    isLoggedIn ,
    upload.single('image'),
    validateListing,
    wrapAsync(listingController.createListing));

// NEW ROUTE ====>>>>
router.get("/new",isLoggedIn,listingController.renderNewForm);


//Update Show and Delete Route ====>>>>
router.route("/:id")
.put(
    isLoggedIn ,
    isOwner ,
    upload.single('image'),
    validateListing,
    
   
     wrapAsync(listingController.updateListing))
.get(wrapAsync(listingController.showListing))
.delete(isLoggedIn,isOwner,wrapAsync(listingController.destroyListing));


// EDIT ROUTE====>>>
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.renderEditForm));


module.exports=router;