import { NextResponse } from "next/server";
import connectMongo from "@/libs/mongoose";
import Post from "@/models/post";

export async function POST(req) {
  const { searchParams } = req.nextUrl;
  const postId = searchParams.get("postId");

  try {
    await connectMongo();

    const post = await Post.findById(postId);

    if (!post) {
      return NextResponse.json({ error: "Post not found." }, { status: 404 });
    }

    post.votesCounter += 1;
    await post.save();

    return NextResponse.json({});
  } catch (error) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}

export async function DELETE(req) {
  const { searchParams } = req.nextUrl;
  const postId = searchParams.get("postId");

  try {
    await connectMongo();

    const post = await Post.findById(postId);

    if (!post) {
      return NextResponse.json({ error: "Post not found." }, { status: 404 });
    }

    post.votesCounter -= 1;
    await post.save();

    return NextResponse.json({});
  } catch (error) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}
