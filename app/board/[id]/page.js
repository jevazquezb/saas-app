import connectMongo from "@/libs/mongoose";
import Board from "@/models/board";
import { redirect } from "next/navigation";

const getBoard = async (boardId) => {
  await connectMongo();

  const board = await Board.findById(boardId);

  if (!board) {
    redirect("/");
  }

  return board;
};

export default async function PublicFeedbackBoard({ params }) {
  const { id } = params;
  const board = await getBoard(id);
  return <main>{board.name} (public)</main>;
}
