import { userModel } from "../../../DB/models/userModel.js"



export const signUp = async (req, res) => {
    try {
        const { firstName, lastName, userName, email, password, age, gander, phone } = req.body
        const isExist = await userModel.findOne({ $or: [{ phone }, { email }, { userName }] })
        if (isExist?.email == email) {
            return res.status(400).json({ message: "email already exist" })
        }
        console.log({ isExist });
        if (isExist?.phone == phone) {
            return res.status(400).json({ message: "phone already exist" })
        }
        if (isExist?.userName == userName) {
            return res.status(400).json({ message: "userName already exist" })
        }

        const newUser = new userModel(req.body)
        await newUser.save()
        console.log("DONE");
        return res.json({ message: "Done",user:newUser})
    } catch (err) {
        res.status(400).json({ err, stack: err.stack })
    }
}


export const signIn = async (req, res) => {
    try {
        const { userName, email, password, phone } = req.body
        const isExist = await userModel.findOne({ $or: [{ userName, password }, { email, password }, { phone, password }] })
        if (!isExist) {
            return res.status(400).json({ message: "Invalid user information" })
        }
        return res.json({ message: `welcome ${isExist.firstName} ${isExist.lastName}`,user:isExist })
    } catch (err) {
        res.status(400).json(err)
    }
}

export const updateUser = async (req, res) => {

    try {

        const { firstName, lastName, age } = req.body
        const { _id } = req.params
        const update = await userModel.findByIdAndUpdate(_id, { firstName, lastName, age })
        if (!update) {
            return res.json({ message: "in-valid user id" })
        }
        else {
            return res.json({ message: "Done" })
        }
    } catch (err) {
        res.status(400).json(err)
    }


}

export const deleteUser = async (req, res) => {

    try {

        const { _id } = req.params
        const deleteUser = await userModel.findByIdAndDelete(_id)
        if (!deleteUser) {
            return res.json({ message: "in-valid user id" })
        }
        else {
            return res.json({ message: "Done" })
        }
    } catch (err) {
        res.status(400).json(err)
    }


}

export const searchUser = async (req, res) => {
    try {

        const { nameStartsWith, age } = req.query;

        const users = await userModel.find({
            firstName: { $regex: `^${nameStartsWith}`, $options: 'i' },
            age: { $lt: age },
        });
        res.json({ users });

    } catch (err) {
        res.status(400).json(err)
    }

}

export const ageBetween = async (req, res) => {
    try {

        const { minAge, maxAge } = req.query;
        const users = await userModel.find({
            age: { $gte: minAge, $lte: maxAge },
        });
        res.json({ users });
    } catch (err) {
        res.status(400).json(err)
    }
}


export const getAllUsers = async (req, res) => {
    try{

        const users = await userModel.find();
        res.json(users);
    }catch(err){
        res.status(400).json(err)
    }
}


export const getUserWithNotes = async (req, res) => {
    const { id } = req.params;
    try {
      const user = await userModel.findById(id).populate('posts');
      if (!user) {
        return res.json({ message: "in-valid user id" })
    }
      res.json(user);
    } catch (err) {
      res.status(400).json({ error: err });
    }
  }













/*

{
    try{

        
    }catch(err){
        res.status(400).json(err)
    }
}

*/