const {mongoose, Schema }=  require("mongoose");

mongoose.connect("mongodb://localhost:27017/paytm")

const Usermodel = new Schema({
    username : {type:String, unique:true},
    firstname: String,
    lastname: String,
    password : String
})
const User = mongoose.model("User", Usermodel)

const Accountmodel = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId,
             required: true,
             ref: "User"
    },
    Amount: {type:Number,
             required: true,
    }
})
const Account= mongoose.model("Account",Accountmodel)

module.exports={Account,User}