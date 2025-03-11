"use client";

import Link from "next/link";
import { signIn } from "next-auth/react";

const ButtonLogin = ({ session, extraStyles }) => {
  const dashboardUrl = "/dashboard";

  return session ? (
    <Link
      href={dashboardUrl}
      className={`btn btn-primary ${extraStyles ? extraStyles : ""}`}
    >
      Welcome back {session.user.name?.split(" ")[0] || "you!"}
    </Link>
  ) : (
    <button
      className={`btn btn-primary ${extraStyles ? extraStyles : ""}`}
      onClick={() => {
        signIn(undefined, { redirectTo: dashboardUrl });
      }}
    >
      Get started
    </button>
  );
};

export default ButtonLogin;
