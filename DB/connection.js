import mongoose from "mongoose";



export const connection = async () => {
    return await mongoose.connect('mongodb+srv://Anas:Eng_anas_121201101459565@cluster0.gkhmpi7.mongodb.net/assignment5?retryWrites=true&w=majority').then(() => {
        console.log("DB connected");
    }).catch(err => {
        console.log({ message: "failed to connect DB", err });
    })
}