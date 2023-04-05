import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoClient } from "mongodb";
const client = new MongoClient(process.env.MONGO_DB_URI);
const bcrypt = require("bcrypt");

export const authOptions = {
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user?._id) token._id = user._id;
      if (user?.name) token.name = user.name;
      if (user?.sites) token.sites = user.sites;

      return token;
    },
    async session({ session, token }) {
      if (token?._id) session.user._id = token._id;
      if (token?.name) session.user.name = token.name;
      if (token?.sites) session.user.sites = token.sites;

      return session;
    },
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await client.connect();
        const users = await client
          .db("stupendous-analytics")
          .collection("users")
          .aggregate([
            { $match: { email: credentials.email.toLowerCase() } },
            {
              $lookup: {
                from: "sites",
                localField: "_id",
                foreignField: "user",
                as: "sites",
              },
            },
          ])
          .toArray();
        await client.close();
        if (
          users[0] &&
          bcrypt.compareSync(credentials.password, users[0].password)
        ) {
          return users[0];
        } else {
          return null;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_URL,
};
export default NextAuth(authOptions);
