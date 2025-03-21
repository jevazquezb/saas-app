"use server";

import connectMongo from "@/libs/mongoose";
import Board from "@/models/board";
import Post from "@/models/post";
import { redirect } from "next/navigation";

// Get data for public board page
const getData = async (boardId) => {
  await connectMongo();

  let board = await Board.findById(boardId);
  let posts = await Post.find({ boardId }).sort({ votesCounter: -1 }); // 1 or -1. -1 orders by the most recent post

  if (!board) {
    redirect("/");
  }

  board = {
    ...board._doc,
    _id: `${board._id}`,
    userId: `${board.userId}`,
  };

  posts = posts.map((post) => {
    return {
      ...post._doc,
      _id: `${post._id}`,
      boardId: `${post.boardId}`,
      userId: `${post.userId}`,
    };
  });

  return { board, posts };
};

export { getData };
