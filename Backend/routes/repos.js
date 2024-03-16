const express = require("express");
const router = express.Router();
const Report = require("../models/Report");


router.get("/",async(req,res)=>{
    try{
        const reports= await Report.find();
        const names= reports.map((repo)=>repo.filename);
        res.json(names);
    }catch(error){
        res.status(500).json( {message: error});
    }
});
module.exports = router;