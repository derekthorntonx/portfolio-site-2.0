import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    id: String,
    password: String,
    role: String
});

const User = mongoose.model('User', userSchema);
export default User;
