import { authMiddleware } from "../middlewares/middleware.js"
import express from "express"
import { PrismaClient } from "@prisma/client"
export const accRouter = express.Router()

const Prisma = new PrismaClient()
accRouter.get("/balance",authMiddleware,async (req,res)=>{
    const userId = req.userId
    console.log(userId)
    const user = await Prisma.accounts.findFirst({
        where:{
            userId: userId
        }
    })
    res.status(200).json({
        balance: user.Amount
    })
})

accRouter.post("/transfer", authMiddleware, async(req,res)=>{
        const senderid = req.userId
        const recieverid = req.body.to
        const amount = req.body.amount
        await Prisma.$transaction(async(tx)=>{
            const sender = await tx.accounts.updateMany({
                where:{
                    userId: senderid, Amount:{gte:amount}
                },
                data:{
                    Amount:{decrement:amount}
                }
            })
            if(sender.count==0){
                throw new Error("Something went wrong");
            }
            await tx.accounts.update({
                where:{
                    userId: recieverid
                },
                data:{
                    Amount:{increment:amount}
                }
            })
        })
        res.status(200).json({
            message: "Transaction successful"
        })
})