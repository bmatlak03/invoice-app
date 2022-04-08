import { MongoClient, ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "DELETE") {
    const id = req.body;

    const client = await MongoClient.connect(
      `${process.env.REACT_APP_MONGODB_URL}`
    );
    const db = client.db();

    const invoicesCollection = db.collection("invoices");

    const result = await invoicesCollection.deleteOne({
      _id: new ObjectId(id),
    });

    console.log(result);

    client.close();

    res.status(201).json({ message: "invoice deleted!" });
  }
}

export default handler;
