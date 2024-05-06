import { HydratedDocument, ToObjectOptions } from "mongoose";

export const createToJSON = <DocType>(): ToObjectOptions<HydratedDocument<DocType>> => ({
  transform: function (doc, ret) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  },
  virtuals: true,
});

export const createToObject = <DocType>(): ToObjectOptions<HydratedDocument<DocType>> => ({
  transform: function (doc, ret) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  },
  virtuals: true,
});
