import bcrypt from "bcrypt";
import { userModel } from "../models/userModel.js";
import { generateAccessToken, generateRefreshToken } from "../../utils.js";
import data from "../../../data.js";

class userClass {
    async signUp(req, res) {
        try {
            let { avatar, name, email, password } = req.body;

            const existUser = await userModel.findOne({ email });

            if (existUser) {
                res.status(400).send({ message: "Email already exists" });
                return;
            }

            // hash password
            const hashPassword = bcrypt.hashSync(password, 10);

            const newUser = await userModel.create({
                avatar: avatar || data.defaultAvatar,
                name,
                email,
                password: hashPassword,
            });

            // token

            const accessToken = generateAccessToken(newUser._id);
            // const refreshToken = generateRefreshToken(newUser._id);

            res.status(200).send({
                _id: newUser._id,
                avatar: newUser.avatar,
                name: newUser.name,
                password,
                email: newUser.email,
                isAmin: newUser.isAdmin,
                token: accessToken,
                // refresh: refreshToken,
            });
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    }

    async signIn(req, res) {
        try {
            const { email, password } = req.body;

            const user = await userModel.findOne({ email });
            if (!user) {
                res.status(400).send({ message: "Invalid email" });
                return;
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                res.status(400).send({ message: "Incorrect password" });
                return;
            }

            // token
            const accessToken = generateAccessToken(user._id);
            // const refreshToken = generateRefreshToken(user._id);

            res.status(200).send({
                _id: user._id,
                avatar: user.avatar,
                password: password,
                name: user.name,
                email: user.email,
                isAmin: user.isAdmin,
                token: accessToken,
                // refresh: refreshToken,
            });
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    }

    async updateInfo(req, res) {
        try {
            const { avatar, name, password } = req.body;
            const hashPassword = bcrypt.hashSync(password, 10);
            const user = await userModel.findByIdAndUpdate(req.user.id, { avatar, name, password: hashPassword }, { new: true });

            res.status(200).send({
                _id: user._id,
                avatar: user.avatar,
                password: password,
                name: user.name,
                email: user.email,
                isAmin: user.isAdmin,
                token: generateAccessToken(user),
            });
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    }
}

export const userController = new userClass();
