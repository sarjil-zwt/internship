import { Request, Response, NextFunction } from "express";

export = (theFunc: Function) => (req: Request, res: Response, next: NextFunction) => {
  Promise.resolve(theFunc(req, res, next)).catch(next);
};
