import { NextResponse } from "next/server";
import connectMongo from "@/libs/mongoose";
import Board from "@/models/board";
import Post from "@/models/post";
import User from "@/models/user";
import { auth } from "@/auth";
import { Filter } from "bad-words";

export async function POST(req) {
  try {
    const { title, description } = await req.json(); // body
    const { searchParams } = req.nextUrl;
    const boardId = searchParams.get("boardId");

    const badWordsFilter = new Filter();
    const sanitizedTitle = badWordsFilter.clean(title);
    const sanitizedDescription = badWordsFilter.clean(description);

    if (!sanitizedTitle) {
      return NextResponse.json(
        { error: "Post title is required." },
        { status: 400 }
      );
    }

    const session = await auth();

    await connectMongo();

    const board = await Board.findById(boardId);

    if (!board) {
      return NextResponse.json({ error: "Board not found." }, { status: 404 });
    }

    const post = await Post.create({
      title: sanitizedTitle,
      description: sanitizedDescription,
      boardId,
      userId: session?.user?.id,
    });

    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const { searchParams } = req.nextUrl;
    const postId = searchParams.get("postId");

    if (!postId) {
      return NextResponse.json(
        { error: "postId is required." },
        { status: 400 }
      );
    }

    const session = await auth();

    await connectMongo();

    const user = await User.findById(session?.user?.id);

    if (!user.hasAccess) {
      return NextResponse.json(
        { error: "Please subscribe first." },
        { status: 403 }
      );
    }

    const post = await Post.findById(postId);

    if (!post) {
      return NextResponse.json({ error: "Post not found." }, { status: 404 });
    }

    if (!user.boards.includes(post.boardId.toString())) {
      return NextResponse.json(
        { error: "Not authorized! You can only delete your own posts." },
        { status: 401 }
      );
    }

    await Post.deleteOne({ _id: postId });

    return NextResponse.json({ message: "Post deleted." });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
