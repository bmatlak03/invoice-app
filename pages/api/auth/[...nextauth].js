import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { connectToDatabase } from "../../../lib/libs";
export default NextAuth({
  session: {
    strategy: "jwt",
    jwt: true,
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const client = await connectToDatabase();

        const usersCollection = client.db().collection("users");

        const user = await usersCollection.findOne({
          email: credentials.email,
        });
        if (!user) {
          client.close();
          throw new Error("No user found with the email");
        }
        const checkPassword = await compare(
          credentials.password,
          user.password
        );
        if (!checkPassword) {
          client.close();
          throw new Error("Password doesnt match");
        }
        client.close();
        return { email: user.email };
      },
    }),
  ],
});
