import User from "../models/auth.js"
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

export const signupUser = async (req, res) => {
    try {
        const { name, email, phoneNumber, password, cnic , imageUrl,role } = req.body
        if (!email || !password) {
            return res.status(400).json({
                message: "Please enter required fieldss!"
            })
        }
        const existUser = await User.findOne({ email })
        if (existUser) {
            return res.status(401).json({
                message: "User already exist!"
            })
        }
        const token = jwt.sign(
            {name},
            'test12',
            {expiresIn:'1d'}
        )
        // console.log(token)
        const salt = await bcrypt.genSalt(10)
        const hashedPass =  bcrypt.hashSync(password,salt)
        // console.log(hashedPass)
        const userObj = {
            name,
            email,
            password:hashedPass,
            token,
            role,
            phoneNumber,
            imageUrl
        }
        const user = await User.create(userObj)
        return res.status(200).json({
            message: "User signup succesfully!",
            user
        })
    } catch (error) {
        return res.status(500).json({
            message: "An error occurred while signing user!",
            error: error.message
        })
    }
}

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                message: "Please enter required fields!"
            });
        }
        const existUser = await User.findOne({ email });
        if (!existUser) {
            return res.status(401).json({
                message: "Please signup first!"
            });
        }
        const comparePass = bcrypt.compareSync(password, existUser.password);
        if (!comparePass) {
            return res.status(400).json({
                message: "Wrong credentials!"
            });
        }
        const token = jwt.sign(
            {
                id: existUser._id,
                name: existUser.userName, 
                email: existUser.email
            },
            'test12',
            { expiresIn: '1d' }
        );

        return res.status(200).json({
            message: "User login successfully!",
            user: existUser,
            token
        });

    } catch (error) {
        return res.status(500).json({
            message: "An error occurred while logging in the user!",
            error: error.message
        });
    }
};
