import { Request, Response } from "express";
import { ProjectModel, UserModel } from "../models";

export const getAllProjects = async (req: Request, res: Response) => {
  try {
    const projects = await ProjectModel.find()
      .populate({
        path: "author",
        select: "firstName lastName email avatarUrl",
      })
      .populate({ path: "users", select: "firstName lastName email avatarUrl" })
      .exec();

    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({
      message: "Failed to get projects",
    });
  }
};

export const getOneProject = async (req: Request, res: Response) => {
  try {
    if (req.params.id) {
      const project = await ProjectModel.findById(req.params.id)
        .populate({
          path: "author",
          select: "firstName lastName email avatarUrl",
        })
        .populate({ path: "users", select: "firstName lastName email avatarUrl" })
        .exec();

      if (project) {
        return res.status(200).json(project);
      }
    }

    res.status(500).json({
      message: "Failed to get project",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to get project",
      error,
    });
  }
};

export const createProject = async (req: Request, res: Response) => {
  try {
    const userIds = Array.from(new Set<string>((<string[]>req.body.userIds).filter((id) => id !== res.locals.userId)));
    const hasUsers = await UserModel.hasUsersWithIds(userIds);

    if (!hasUsers) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const doc = new ProjectModel({
      title: req.body.title,
      order: req.body.order,
      statuses: req.body.statuses,
      author: res.locals.userId,
      users: userIds,
    });
    const project = await doc.save();

    if (!project) {
      return res.status(500).json({
        message: "Failed to create post",
      });
    }

    res.status(200).json(project.toJSON());
  } catch (error) {
    res.status(500).json({
      message: "Failed to create post",
    });
  }
};

export const updateProject = async (req: Request, res: Response) => {
  try {
    if (req.params.id) {
      const userIds = Array.from(
        new Set<string>((<string[]>req.body.users).filter((id) => id !== res.locals.userId))
      );
      console.log(
        userIds,
        res.locals.userId,
        (<string[]>req.body.users).filter((id) => id !== res.locals.userId)
      );
      const hasUsers = await UserModel.hasUsersWithIds(userIds);

      if (!hasUsers) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      const project = await ProjectModel.findByIdAndUpdate(
        req.params.id,
        {
          title: req.body.title,
          order: req.body.order,
          statuses: req.body.statuses,
          users: userIds,
        },
        { returnDocument: "after" }
      );

      if (project) {
        return res.status(200).json(project);
      } else {
        return res.status(404).json({
          message: "User not found",
        });
      }
    }

    res.status(500).json({
      message: "Failed to update post",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to update post",
      error,
    });
  }
};

export const deleteProject = async (req: Request, res: Response) => {
  try {
    if (req.params.id) {
      const project = await ProjectModel.findByIdAndDelete(req.params.id);

      if (project) {
        return res.sendStatus(200);
      } else {
        return res.status(404).json({
          message: "Project not found",
        });
      }
    }

    res.status(500).json({
      message: "Failed to delete project",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete project",
    });
  }
};

export const deleteStatus = async (req: Request, res: Response) => {
  try {
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500);
  }
};
