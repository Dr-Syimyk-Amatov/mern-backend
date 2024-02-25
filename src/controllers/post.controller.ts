import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { PostModel } from "../models";

export const getAllPosts = async (req: Request, res: Response) => {
  try {
    const posts = await PostModel.find().populate({ path: "author", select: "fullName email avatarUrl" }).exec();

    res.status(200).json(
      posts.map(({ title, content, tags, author, viewCounts, imageUrl }) => ({
        title,
        content,
        tags,
        author,
        viewCounts,
        imageUrl,
      }))
    );
  } catch (error) {
    res.status(500).json({
      message: "Failed to get posts",
    });
  }
};

export const getOnePost = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    if (id) {
      const post = await PostModel.findByIdAndUpdate(
        id,
        {
          $inc: { viewCounts: 1 },
        },
        {
          returnDocument: "after",
        }
      )
        .populate({ path: "author", select: "fullName email avatarUrl" })
        .exec();

      if (post) {
        return res.status(200).json({
          title: post.title,
          content: post.content,
          tags: post.tags,
          imageUrl: post.imageUrl,
          author: post.author,
          viewCounts: post.viewCounts,
        });
      } else {
        return res.status(404).json({
          message: "Post was not found",
        });
      }
    }

    res.status(500).json({
      message: "Failed to get post",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to get post",
    });
  }
};

export const createPost = async (req: Request, res: Response) => {
  try {
    const doc = new PostModel({
      title: req.body.title,
      content: req.body.content,
      tags: req.body.tags,
      imageUrl: req.body.imageUrl,
      author: null,
    });
    const post = await doc.save();

    if (post) {
      return res.status(200).json({
        title: post.title,
        content: post.content,
        tags: post.tags,
        imageUrl: post.imageUrl,
        author: post.author,
      });
    }

    res.status(500).json({
      message: "Failed to create post",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create post",
    });
  }
};

export const updatePost = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    if (id) {
      const post = await PostModel.findByIdAndUpdate(
        id,
        {
          title: req.body.title,
          content: req.body.content,
          tags: req.body.tags,
          imageUrl: req.body.imageUrl,
        },
        {
          returnDocument: "after",
        }
      );

      if (post) {
        return res.status(200).json({
          title: post.title,
          content: post.content,
          tags: post.tags,
          imageUrl: post.imageUrl,
          author: post.author,
        });
      } else {
        return res.status(404).json({
          message: "Post was not found",
        });
      }
    }

    res.status(500).json({
      message: "Failed to update post",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update post",
    });
  }
};

export const deletePost = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    if (id) {
      const post = await PostModel.findByIdAndDelete(id);

      if (post) {
        return res.sendStatus(200);
      } else {
        return res.status(404).json({
          message: "Post was not found",
        });
      }
    }

    res.status(500).json({
      message: "Failed to update post",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update post",
    });
  }
};
