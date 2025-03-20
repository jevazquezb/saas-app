import connectMongo from "@/libs/mongoose";
import Board from "@/models/board";
import Post from "@/models/post";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import CardBoardLink from "@/components/card-board-link";
import ButtonDeleteBoard from "@/components/button-delete-board";
import CardPostAdmin from "@/components/card-post-admin";

const getData = async (boardId) => {
  const session = await auth();
  await connectMongo();

  const board = await Board.findOne({
    _id: boardId,
    userId: session?.user?.id,
  });

  if (!board) {
    redirect("/dashboard");
  }

  const posts = await Post.find({ boardId }).sort({ createdAt: -1 });

  return { board, posts };
};

export default async function FeedbackBoard({ params }) {
  const { id } = params;
  const { board, posts } = await getData(id);

  return (
    <main className="bg-base-200 min-h-screen">
      {/* HEADER */}
      <section className="bg-base-100">
        <div className="max-w-5xl mx-auto px-5 py-3 flex">
          <Link href="/dashboard" className="btn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="size-4"
            >
              <path
                fillRule="evenodd"
                d="M12.5 9.75A2.75 2.75 0 0 0 9.75 7H4.56l2.22 2.22a.75.75 0 1 1-1.06 1.06l-3.5-3.5a.75.75 0 0 1 0-1.06l3.5-3.5a.75.75 0 0 1 1.06 1.06L4.56 5.5h5.19a4.25 4.25 0 0 1 0 8.5h-1a.75.75 0 0 1 0-1.5h1a2.75 2.75 0 0 0 2.75-2.75Z"
                clipRule="evenodd"
              />
            </svg>
            Back
          </Link>
        </div>
      </section>
      <section className="max-w-5xl mx-auto px-5 py-12 flex flex-col md:flex-row gap-12">
        <div className="space-y-8">
          <h1 className="font-extrabold text-xl mb-4">{board.name}</h1>
          <CardBoardLink boardId={`${board._id}`} />
          <ButtonDeleteBoard boardId={`${board._id}`} />
        </div>
        <ul className="space-y-4 flex-grow">
          {posts.map((post) => (
            <CardPostAdmin key={post._id} post={post} />
          ))}
        </ul>
      </section>
    </main>
  );
}
