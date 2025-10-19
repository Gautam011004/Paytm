import mongoose from "mongoose"
import { Account } from "../../db/db.js"
import { authMiddleware } from "../middlewares/middleware.js"

import express from "express"
export const accRouter = express.Router()

accRouter.get("/balance",authMiddleware,async (req,res)=>{
    const userId = req.userId
    const user = await Account.findOne({
        userId: userId
    })
    res.status(200).json({
        balance: user.Amount
    })
})

accRouter.post("/transfer", authMiddleware, async(req,res)=>{
    const transferId = req.body.to    
    const amount = req.body.amount
    const senderId = req.userid
    const sender = await Account.findOne({
        userId: senderId
    })
    const user = await Account.findOne({
        userId: transferId
    })
    if(!user){
        res.status(400).json({
            message: "Invalid account"
        })
        return
    }

    if(sender.Amount<amount){
        res.status(400).json({
            message: "Insufficient balance"
        })
        return
    }
    const session = await mongoose.startSession()

    try{
        await session.withTransaction(async()=>{
            await Account.updateOne(
                { userId: req.userId },
                { $inc: { Amount: -amount }},
                { session }
            )
            await Account.updateOne(
                { userId: transferId },
                { $inc: { Amount: +amount }},
                { session }
            )
        })
        res.status(200).json({
            message: "Transaction successful"
        })
    }catch(e){
        res.status(400).json({
            message: "Transaction failed"
        })
        return
    }
    finally{
        await session.endSession()
    }
})