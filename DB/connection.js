import mongoose from "mongoose";



export const connection = async () => {
    return await mongoose.connect('mongodb+srv://anas:GngZM3HOG6Es5enq@cluster0.kwnfpnh.mongodb.net/assignment5').then(() => {
        console.log("DB connected");
    }).catch(err => {
        console.log({ message: "failed to connect DB", err });
    })
}