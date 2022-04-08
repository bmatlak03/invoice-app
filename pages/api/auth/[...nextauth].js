import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { MongoClient } from "mongodb";
import { compare } from "bcryptjs";

export default NextAuth({
  session: {
    jwt: true,
  },
  providers: [
    Providers.Credentials({
      async authorize(credentials) {
        const client = await MongoClient.connect(
          process.env.REACT_APP_MONGODB_URL
        );
        const users = await client.db().collection("users");
        const result = await users.findOne({
          email: credentials.email,
        });
        if (!result) {
          client.close();
          throw new Error("No user found with the email");
        }
        const checkPassword = await compare(
          credentials.passowrd,
          result.passowrd
        );
        if (!checkPassword) {
          client.close();
          throw new Error("Password doesnt match");
        }
        client.close();
        return { email: result.email };
      },
    }),
  ],
});
