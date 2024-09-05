import { Response } from "express";
import { ValidationError, validationResult } from "express-validator";
import { Request } from "express-validator/lib/base";

export const validate = (req: Request, res: Response, next: () => void) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
