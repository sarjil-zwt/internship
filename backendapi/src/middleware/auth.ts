import { Request, Response, NextFunction } from 'express';
// import ErrorHandler from '../utils/errorhandler';
// import catchAsyncErrors from './catchAsyncErrors';
var jwt = require('jsonwebtoken');
import { myDataSource } from '../datasource';
import { User } from '../entity/User';
import catchAsyncErrors = require('./catchAsyncErrors');
import ErrorHandler from '../utils/errorhander';


const userRepository = myDataSource.getRepository(User)

interface DecodedData {
  id: string;
}

export const isAuthenticatedUser = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const { token } = req.cookies;

    if (!token) {
      return next(new ErrorHandler('Please Login to access this resource', 401));
    }

    const decodedData = jwt.verify(token, "sarjil");
    if (!decodedData) {
      return next(new ErrorHandler('Invalid token', 401));

    }

    (req as any).user = await userRepository.findOne({ where: { id: decodedData.id } });

    if (!(req as any).user) {
      return next(new ErrorHandler('Invalid token', 401));

    }

    next();
  }
);

export const authorizeRoles = (...roles: string[]) => {
  console.log(roles)
  return (req: Request, res: Response, next: NextFunction) => {
    if (!roles.includes((req as any).user.role)) {
      return next(
        new ErrorHandler(
          `Role: ${(req as any).user.role} is not allowed to access this resource `,
          403
        )
      );
    }

    next();
  };
};
