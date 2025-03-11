import NextAuth from "next-auth";
import Resend from "next-auth/providers/resend";
import Google from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "./libs/mongo";

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  providers: [
    Resend({
      apiKey: process.env.RESEND_KEY,
      from: "no-reply@email.saasjavb.space",
      name: "email",
    }),
    Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      // authorization: {
      // url: "https://accounts.google.com/o/oauth2/auth/authorize?response_type=code&prompt=login",
      // params: {
      //   prompt: "consent",
      //   access_type: "offline",
      //   response_type: "code",
      // },
      // },
      allowDangerousEmailAccountLinking: true,
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
});
