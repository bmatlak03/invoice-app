import { MongoClient } from "mongodb";
import { hash } from "bcryptjs";

export const connectToDatabase = async () => {
  const client = await MongoClient.connect(`${process.env.MONGODB_URL}`);

  return client;
};

export const hashPassword = async (password: string) => {
  const hashedPassword = await hash(password, 12);
  return hashedPassword;
};
