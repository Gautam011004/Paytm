import jwt from "jsonwebtoken"

export function authMiddleware(req,res,next){
    const authHeader = req.header.authorization

    const token = authHeader.split(" ")[1]

    const userId = jwt.verify(token,process.env.JWT_SECRET)

    if(!userId){
        res.status(403).json({
            messge: "Invalid JWT"
        })
        return
    }
    req.userId = userId
    next()
}