import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { connectToDatabase } from "../../../lib/db";
export default NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const client = await connectToDatabase();

        const usersCollection = client.db().collection("users");

        const user = await usersCollection.findOne({
          email: credentials.email,
        });
        console.log(user);
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
