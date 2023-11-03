import { NextFunction, Request, Response } from "express";

type middleware = (
  request: Request,
  response: Response,
  next: NextFunction
) => void;

export default middleware;
