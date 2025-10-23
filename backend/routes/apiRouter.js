import {accRouter} from "./accRouter.js"
import {userRouter}  from "./userRouter.js"

import  express  from "express"

export const apiRouter = express.Router()
 
apiRouter.use("/user",userRouter)
apiRouter.use("/account",accRouter)