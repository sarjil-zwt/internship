import { Request, Response } from "express";
import { User } from "../entity/User";
import { myDataSource } from "../datasource";
import ErrorHandler from "../utils/errorhander";
import { NextFunction } from "connect";
import { sendToken } from "../utils/jwtToken";


export const signupUser = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const userRepository = myDataSource.getRepository(User);

        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;


        const user = await userRepository.findOne({ where: { email } })

        console.log(user)

        if (user) {
            return res.json({
                status: 400,
                message: "Email Already exist"
            })
            // return next(new ErrorHandler("Email Already exist", 403));
        }

        const newUser = userRepository.create({
            name,
            email,
            password
        });

        const result = await userRepository.save(newUser);

        res.status(201).json({
            success: true,
            user: result
        });
    } catch (error) {
        console.error("Error creating user:", error.message);
        res.status(500).json({
            success: false,
            error: "Internal Server Error"
        });
    }
}

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;
        const userRepository = myDataSource.getRepository(User);

        // checking if user has given password and email both

        if (!email || !password) {
            return next(new ErrorHandler("Please Enter Email & Password", 400));
        }

        const user = await userRepository.findOne({ where: { email } })

        if (!user) {
            return next(new ErrorHandler("Invalid email or password", 401));
        }

        const isPasswordMatched = password === user.password

        if (!isPasswordMatched) {
            return next(new ErrorHandler("Invalid email or password", 401));
        }

        sendToken(user, 200, res);
    } catch (error) {
        res.status(500).json({
            success: false,
            error: "Internal Server Error"
        });
    }
}


export const getProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = (req as any).user

        res.status(200).json({
            success: true,
            user
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: "Internal Server Error"
        });
    }
}

export const updateProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const userRepo = myDataSource.getRepository(User)
        const user = userRepo.update({ id: (req as any).user.id }, (req as any).body)

        res.status(200).json({
            success: true,
            user
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: "Internal Server Error"
        });
    }
}