"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import ButtonLogout from "@/components/button-logout";
import FormNewBoard from "@/components/form-new-board";
import Link from "next/link";
import ButtonCheckout from "@/components/button-checkout";
import ButtonPortal from "@/components/button-portal";

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const response = await axios.get("/api/user");
      setUser(response.data);
    } catch (error) {
      console.error("Failed to fetch user:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // To remove authentication query params in live version
    const hasQueryParams = window.location.search.length > 0;

    if (hasQueryParams) {
      router.replace("/dashboard");
    }

    // Fetch user data from an API route
    fetchUser();
  }, [router]);

  const handleBoardAdded = (newBoard) => {
    setUser((prev) => ({
      ...prev,
      boards: [...prev.boards, newBoard],
    }));
  };

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </main>
    );
  }

  return (
    <main className="bg-base-200 min-h-screen">
      {/* HEADER */}
      <section className="bg-base-100">
        <div className="max-w-5xl mx-auto px-5 py-3 flex justify-between">
          {user?.hasAccess ? <ButtonPortal /> : <ButtonCheckout />}
          <ButtonLogout />
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-5 py-12 space-y-12">
        <FormNewBoard onBoardAdded={handleBoardAdded} />
        <div>
          <h1 className="font-extrabold text-xl mb-4">
            {user?.boards.length} Boards
          </h1>
          <ul className="space-y-4">
            {user?.boards.map((board) => {
              return (
                <li key={board._id}>
                  <Link
                    href={`/dashboard/board/${board._id}`}
                    className="block bg-base-100 p-6 rounded-3xl hover:bg-neutral hover:text-neutral-content duration-100"
                  >
                    {board.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </main>
  );
}
