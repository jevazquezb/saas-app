"use client";

import { useState, useEffect } from "react";
import { getData } from "@/utilities/helpers";
import FormAddPost from "@/components/form-add-post";
import CardPost from "@/components/card-post";

export default function PublicFeedbackBoard({ params }) {
  const { id } = params;
  const [board, setBoard] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { board, posts } = await getData(id);
      setBoard(board);
      setPosts(posts);
    };

    fetchData();
  }, [id]);

  const handleVoteChange = async () => {
    const { posts } = await getData(id);
    setPosts(posts);
  };

  const handlePostAdded = async () => {
    const { posts } = await getData(id);
    setPosts(posts);
  };

  return (
    <main className="min-h-screen bg-base-200">
      <section className="max-w-5xl mx-auto p-5">
        <h1 className="text-lg font-bold">{board?.name} (public)</h1>
      </section>

      <section className="max-w-5xl mx-auto px-5 flex flex-col md:flex-row items-start gap-8 pb-12">
        <FormAddPost boardId={id} onPostAdded={handlePostAdded} />
        <ul className="space-y-4 flex-grow">
          {posts.map((post) => (
            <CardPost
              key={post._id}
              post={post}
              onVoteChange={handleVoteChange}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}
