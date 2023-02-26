import bcrypt from "bcrypt";
import { userModel } from "../models/userModel.js";
import { generateToken } from "../../utils.js";

class userClass {
    async signIn(req, res) {
        try {
            const { email, password } = req.body;

            const user = await userModel.findOne({ email: email });
            if (!user) {
                res.status(400).send({ message: "Invalid email" });
                return;
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                res.status(400).send({ message: "Incorrect password" });
                return;
            }

            res.status(200).send({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAmin: user.isAdmin,
                token: generateToken(user),
            });
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    }
}

export const userController = new userClass();
