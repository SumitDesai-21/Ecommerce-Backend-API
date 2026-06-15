import mongoose, {  Schema } from "mongoose";

// user schema
const userSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true, lowercase: true },
    password: {type: String, required: true, select: false},
    role: {type: String, enum: ["USER", "ADMIN"], default: "USER"},
}, { timestamps:true }); // time stamps for user registration date, last update time

const User = mongoose.model("User", userSchema);
export { User };

// mongoDB automatically adds 
// 1) createdAt
// 2) updatedAt
