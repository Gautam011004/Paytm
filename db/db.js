import mongoose, { Model, Schema } from "mongoose";

mongoose.connect("mongodb+srv://divyagautam326_db_user:910yM5b9UMo75Dms@cluster0.3a6gnuz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")

const Usermodel = new Schema({
    username : {type:String, unique:true},
    firstname: String,
    lastname: String,
    password : String
})
export const User = mongoose.model("User", Usermodel)

const Accountmodel = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId,
             required: true,
             ref: "User"
    },
    Amount: {type:Number,
             required: true,
    }
})

export const Account= mongoose.model("Account",Accountmodel)