// Create Token and saving in cookie

import { Response } from "express";
import { myDataSource } from "../datasource";
import { User } from "../entity/User";


const userRepository = myDataSource.getRepository(User)

export const sendToken = (user: User, statusCode: number, res: Response) => {
  const token = user.getJWTToken();

  // options for cookie
  const options = {
    expires: new Date(
      Date.now() + Number.parseInt('3d') * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    user,
    token,
  });
};
