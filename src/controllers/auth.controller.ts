import { Request, Response } from "express";
import { validationResult } from "express-validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { RegisterUserResponse } from "../interfaces";
import { UserModel } from "../models";
import { SECRET } from "../consts/secret";

export const register = async (req: Request, res: Response) => {
  try {
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    const doc = new UserModel({
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      avatarUrl: req.body.avatarUrl,
      passwordHash: passwordHash,
    });
    const user = await doc.save();

    const token = jwt.sign({ _id: user._id }, SECRET, { expiresIn: "30d" });
    const resBody: RegisterUserResponse = {
      id: doc.id,
      email: doc.email,
      firstName: doc.firstName,
      lastName: doc.lastName,
      avatarUrl: doc.avatarUrl,
      token,
    };
    res.status(200).json(resBody);
  } catch (error) {
    res.status(500).json({
      error,
      message: "Can't register user",
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });
    if (user) {
      const isPasswordSame = await bcrypt.compare(req.body.password, user.passwordHash);

      if (isPasswordSame) {
        const token = jwt.sign(
          {
            _id: user._id,
          },
          SECRET,
          { expiresIn: "30d" }
        );
        return res.status(200).json({
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          avatarUrl: user.avatarUrl,
          token,
        });
      }
    }

    res.status(401).json({
      message: "Wrong login or password",
    });
  } catch (error) {
    res.status(401).json({
      message: "Wrong login or password",
    });
  }
};

export const getMe = async (req: Request, res: Response) => {
  try {
    const user = await UserModel.findById(res.locals.userId);
    if (user) {
      res.status(200).json({
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        avatarUrl: user.avatarUrl,
      });
    } else {
      res.status(404).json({
        message: "User is not found",
      });
    }
  } catch (error) {
    res.status(404).json({
      message: "User is not found",
    });
  }
};
