import { NextFunction, Request } from "express";
import { CustomResponse } from "./types";

export const parseUserParam: (
  req: Request<{
    user: string;
  }>,
  res: CustomResponse,
  next: NextFunction,
) => void = (req, res, next) => {
  try {
    const user = req.params.user.trim().toLowerCase();

    if (!user) {
      return res.sendStatus(400);
    }

    res.locals.username = user;
    next();
  } catch (err) {
    console.error(err);
    return res.sendStatus(500);
  }
};
