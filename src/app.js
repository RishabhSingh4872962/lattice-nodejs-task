import express from "express";


const app=express();


app.get("/",function (req,res,next) {
    return res.status(200).send({success:true,msg:"Server is working "})
})

export default app