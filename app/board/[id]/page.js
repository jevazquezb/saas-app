import connectMongo from "@/libs/mongoose";
import Board from "@/models/board";
import Post from "@/models/post";
import { redirect } from "next/navigation";
import FormAddPost from "@/components/form-add-post";
import CardPost from "@/components/card-post";

const getData = async (boardId) => {
  await connectMongo();

  const board = await Board.findById(boardId);
  const posts = await Post.find({ boardId }).sort({ votesCounter: -1 }); // 1 or -1. -1 orders by the most recent post

  if (!board) {
    redirect("/");
  }

  return { board, posts };
};

export default async function PublicFeedbackBoard({ params }) {
  const { id } = params;
  const { board, posts } = await getData(id);

  return (
    <main className="min-h-screen bg-base-200">
      <section className="max-w-5xl mx-auto p-5">
        <h1 className="text-lg font-bold">{board.name} (public)</h1>
      </section>

      <section className="max-w-5xl mx-auto px-5 flex flex-col md:flex-row items-start gap-8 pb-12">
        <FormAddPost boardId={id} />
        <ul className="space-y-4 flex-grow">
          {posts.map((post) => (
            <CardPost key={`${post._id}`} post={post} />
          ))}
        </ul>
      </section>
    </main>
  );
}
