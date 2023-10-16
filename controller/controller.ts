import { NextFunction, Request, Response } from "express";

type controller = (
  request: Request,
  response: Response,
  next: NextFunction
) => void;

export default controller;
