import { MongoClient } from "mongodb";

export async function connectToDatabase() {
  const client = await MongoClient.connect(
    `${process.env.REACT_APP_MONGODB_URL}`
  );

  return client;
}
