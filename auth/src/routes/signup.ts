import express, { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { User, UserAttrs } from "../models/user";
import { RequestValidationError } from "../errors/request-validation-error";
import { BadRequestError } from "../errors/bad-request-error";
import jwt from "jsonwebtoken";
import { validateRequest } from "../middlewares/validate-request";

const router = express.Router();

router.post("/api/users/signup", [
  body("email")
    .isEmail()
    .withMessage("Email must be valid"),
  body("password")
    .trim()
    .isLength({ min: 4, max: 20 })
    .withMessage("Password must be between 4 and 20 characters")
], 
validateRequest,
async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    // console.log("Email in use");
    // return res.send({});
    throw new BadRequestError("Email in use");
  }

  const user = new User({
    email,
    password
  })
  await user.save();

  // Generate jwt
  const userJwt = jwt.sign({
    id: user.id,
    email: user.email
  }, process.env.JWT_KEY!)

  // Store it on session object
  req.session = {
    jwt: userJwt
  };

  res.status(201).send(user);
});

export { router as signupRouter };