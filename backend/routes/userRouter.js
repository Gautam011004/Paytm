import { Account, User } from "../../db/db.js";
import { authMiddleware } from "../middlewares/middleware.js";
import jwt from "jsonwebtoken"; 
import express from "express"
import  { z, string } from "zod";
export const userRouter = express.Router() 


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
        const exsistingUser = await User.findOne({
                username: req.body.username
        })
        if(exsistingUser){
                res.status(411).json({
                        message: "User already exsists"
                })
                return
        }
        const user = await User.create({
                username: req.body.username,
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                password: req.body.password
        })

        await Account.create({
                userId: user._id,
                Amount: Math.random()*10000
        })
        const userId = user._id
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
        const user = await User.findOne({
                username: req.body.username,
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
        User.updateOne({_id:req.userId},req.body)

        res.status(200).json({
                message: "Information updated"
        })
})

userRouter.get("/bulk",(req,res)=>{
        const filter = req.query.filter || ""

        const users = User.find({
                $or:[{
                        firstname:{
                                "$regex":filter
                        }
                },
                {
                        lastname:{
                                "$regex":filter
                        }
                }
        ]
        })

        res.status(200).json({
                user: users.map(user=>({
                        username: user.username,
                        firstname: user.firstname,
                        lastname: user.lastname,
                        userId: user._id
                }))
        })
})