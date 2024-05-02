 
const mongoose = require('mongoose');
const argon2 = require("argon2");
const { number } = require('zod');

mongoose.connect("mongodb+srv://ducheharsh:hd123@cluster0.sk8fkkq.mongodb.net/Paytm")

const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        minLength:8,
        },
    password:{
        type:String,
        required:true,
        minLength:8,
        },
    firstName:String,
    lastName:String
})

const AccountsSchema = new mongoose.Schema({
        userId:{
            type:mongoose.Types.ObjectId,
            ref:'User',
            required:true
        },
        balance:{
            type: Number,
            required: true
        }
    
})



// Method to generate Hash from plain text  using argon2
UserSchema.methods.createHash = async function (plainTextPassword) {
    // return password hash
    return await argon2.hash(plainTextPassword);
};

// Method to validate the entered password using argon2
UserSchema.methods.validatePassword = async function (candidatePassword) {
  return await argon2.verify(this.password, candidatePassword)
};

const User = mongoose.model("User", UserSchema);
const Account = mongoose.model("Account", AccountsSchema)

module.exports = {
    User,
    Account
}
