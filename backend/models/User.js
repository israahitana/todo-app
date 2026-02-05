const mongoose=require("mongoose");//connection avec mongoose 
const userSchema=new mongoose.Schema({//creation schema mongoose
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    },
    {
    timestamps: true, 
  }
);
module.exports=mongoose.model("User",userSchema);//creation du modele User avec le schema userSchema 