import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import userModal from '../Models/userModal.js'
import responseHandler from '../utils/responseHandler.js';
import bioModal from '../Models/BioModel.js';

export const signup = async (req, res) => {
    try {

        const { email, name, password } = req.body;
        const existUser = await userModal.findOne({ email });

        if (existUser) {
            return responseHandler(res, 400, "User already exists");
        }
        const newUser = new userModal({ name, email, password });
        newUser.password = await bcrypt.hash(password, 10);
        await newUser.save();

        // default values will auto apply
        const newBio = await bioModal.create({
            user: newUser._id
        });
        await newBio.save()
        responseHandler(res, 201, "User created successfully");

    } catch (error) {
        return responseHandler(res, 500, "Internal Server Error", error)
    }
}


export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const existUser = await userModal.findOne({ email });

        if (!existUser) {
            responseHandler(res, 404, "User not found");
        }

        const isPasswordCorrect = await bcrypt.compare(password, existUser.password);
        if (!isPasswordCorrect) {
            return responseHandler(res, 401, "Incorrect password");
        }

        const token = jwt.sign(
            { email: existUser.email, _id: existUser._id },
            process.env.JWT_SECRET,
            { expiresIn: "24h" }
        );

        res.cookie('auth_token', token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
        });
        responseHandler(res, 200, "Login Successfully", {
            token,
            name: existUser.name,
            userId: existUser._id,
            avatar: existUser.avatar
        })

    } catch (error) {
        responseHandler(res, 500, "Internal Server Error", error)
    }
};

export const logout = (req, res) => {
    res.clearCookie('auth_token');
    res.status(200).json({ message: 'Logged out successfully' });
};
