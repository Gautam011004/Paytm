import {authMiddleware } from "../middlewares/middleware.js";
import jwt from "jsonwebtoken"; 
import express from "express"
import { z }  from "zod"
import { PrismaClient } from "@prisma/client";
export const userRouter = express.Router() 
const Prisma = new PrismaClient()

const userModel = z.object ({
        username: z.string().email(),
        firstname: z.string(),
        lastname: z.string(),
        password: z.string()

})

const signinBody = z.object({
        username: z.string().email(),
        password: z.string()
})

const updateBody = z.object({
        password: z.string().optional(),
        firstname: z.string().optional(),
        lastname: z.string().optional(),
})

userRouter.post("/signup", async (req,res)=>{
        const {success} = userModel.safeParse(req.body);
        if(!success){
                res.status(411).json({
                        meassge: "Invalid creds"
                })
                return
        }
        const exsistingUser = await Prisma.user.findFirst({
                where:{
                        username: req.body.username
                }
        })
        if(exsistingUser){
                res.status(411).json({
                        message: "User already exsists"
                })
                return
        }
        const user = await Prisma.user.create({
                data:{
                        username: req.body.username,
                        firstname: req.body.firstname,
                        lastname: req.body.lastname,
                        password: req.body.password
                }
        })

        await Prisma.accounts.create({
                data:{
                        userId: user.userId,
                        Amount: Math.random()*10000
                }
        })
        const userId = user.userId
        const token = jwt.sign({userId}, process.env.JWT_SECRET)
        res.status(200).json({
                meassge: "User created succesfully",
                token: token
        })
})

userRouter.post("/signin",async (req,res)=>{
        const {success} = signinBody.safeParse(req.body)
        if(!success){
                res.status(411).json({
                        message: "Invalid inputs"
                })
                return
        }
        const user = await Prisma.user.findFirst({
                where:{
                        username: req.body.username,
                }
        })
        if(!user){
                res.status(411).json({
                        meassge: "User not found"
                })
                return
        }
        if(req.body.password != user.password){
                res.status(411).json({
                        meassge: "Incorrect password"
                })
                return
        }
        const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET)
        res.status(200).json({
                token: token
        })
})
userRouter.put("/",authMiddleware, (req,res)=>{
        const { success } =  updateBody.safeParse(req.body)

        if(!success){
                res.status(411).json({
                        message: "Error while updating"
                })
                return
        }
        Prisma.user.update({
                where:{
                        userId: req.userId
                },
                data:{
                        username: req.body.username,
                        lastname: req.body.lastname
                }
        })

        res.status(200).json({
                message: "Information updated"
        })
})

userRouter.get("/me",authMiddleware,async (req,res)=>{
        const userId = req.userId
        const User = await Prisma.user.findFirst({
                where:
                {
                        userId: userId
                }
        })
        res.status(200).json({
                firstname : User.firstname,
                lastname: User.lastname
        })
})

userRouter.get("/bulk",async (req,res)=>{
        const filter = req.query.filter || ""

        const users = await Prisma.user.findMany({
                where:{
                        OR:[
                                {firstname:{contains:filter,mode:"insensitive"}},
                                {lastname:{contains:filter,mode:"insensitive"}}
                        ]
                }
        })

        res.status(200).json({
                users: users
        })
})