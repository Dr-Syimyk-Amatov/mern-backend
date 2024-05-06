import { Request, Response } from "express";
import { PriorityModel } from "../models";

export const getAllPriorities = async (req: Request, res: Response) => {
  try {
    const baseQuery = PriorityModel.find();
    const priorities = await (res.locals.hasSortParams
      ? baseQuery.sort({ [req.query.sortKey as string]: res.locals.sortOrder })
      : baseQuery);

    return res.status(200).json(priorities.map<string[]>((priority) => priority.toJSON()));
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to get priorites",
    });
  }
};

export const getOnePriority = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    if (id) {
      const doc = await PriorityModel.findById(id);

      if (doc) {
        return res.status(200).json(doc.toJSON());
      }
    }

    return res.status(500).json({
      message: "Failed to get priority",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to get priority",
    });
  }
};

export const createPriority = async (req: Request, res: Response) => {
  try {
    const doc = new PriorityModel({
      title: req.body.title,
      colors: req.body.colors,
      default: req.body.default,
    });
    const priority = await doc.save();

    if (priority) {
      return res.status(200).json(priority.toJSON());
    }

    res.status(500).json({
      message: "Failed to create priority",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create priority",
    });
  }
};

export const updatePriority = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    if (id) {
      const doc = await PriorityModel.findByIdAndUpdate(
        id,
        {
          title: req.body.title,
          colors: req.body.colors,
          default: req.body.default,
        },
        { returnDocument: "after" }
      );

      if (doc) {
        return res.status(200).json(doc.toJSON());
      }
    }

    return res.status(500).json({
      message: "Failed to update priority",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to update priority",
    });
  }
};

export const deletePriority = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    if (id) {
      const doc = await PriorityModel.findByIdAndDelete(id);

      if (doc) {
        return res.status(200).json(doc.toJSON());
      } else {
        return res.status(404).json({
          message: "Priority was not found",
        });
      }
    }

    return res.status(500).json({
      message: "Failed to delete priority",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to delete priority",
    });
  }
};
