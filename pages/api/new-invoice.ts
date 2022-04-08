import { MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const data = req.body;

    const client = await MongoClient.connect(
      `${process.env.REACT_APP_MONGODB_URL}`
    );
    const db = client.db();

    const invoicesCollection = db.collection("invoices");

    const result = await invoicesCollection.insertOne(data);

    console.log(result);

    client.close();

    res
      .status(201)
      .json({ message: "invoice inserted!", id: result.insertedId });
  }
}

export default handler;
