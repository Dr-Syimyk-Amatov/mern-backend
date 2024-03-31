import mongoose from "mongoose";
import { createToJSON } from "../utils";

interface UserModelType {
  firstName: string;
  lastName: string;
  email: string;
  passwordHash: string;
  avatarUrl?: string;
}

const UserSchema = new mongoose.Schema<
  UserModelType,
  {},
  {},
  {},
  {},
  {
    hasUsersWithIds: (ids: string[]) => Promise<boolean>;
    getUsersByIds: (ids: string[]) => Promise<any>;
  }
>(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    avatarUrl: String,
  },
  {
    timestamps: true,
    toJSON: {
      ...createToJSON(),
      virtuals: true,
    },
    statics: {
      getUsersByIds(ids: string[]) {
        return this.find({ _id: { $in: ids } });
      },
      hasUsersWithIds(ids: string[]) {
        return this.find({ _id: { $in: ids } }).then((users) => users.every((user) => Boolean(user)));
      },
    },
  }
);

export const UserModel = mongoose.model("User", UserSchema);
