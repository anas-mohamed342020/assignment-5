import mongoose from "mongoose";



export const connection = async () => {
    return await mongoose.connect('mongodb://0.0.0.0:27017/assignment5').then(() => {
        console.log("DB connected");
    }).catch(err => {
        console.log({ message: "failed to connect DB", err });
    })
}