import { MongoClient, ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "PUT") {
    const data = req.body;
    const client = await MongoClient.connect(
      `mongodb+srv://bartek:${process.env.REACT_APP_MONGODB_PASS}@cluster0.j0lnf.mongodb.net/invoicesDatabase?retryWrites=true&w=majority`
    );
    const db = client.db();

    const invoicesCollection = db.collection("invoices");

    const result = await invoicesCollection.updateOne(
      { _id: new ObjectId(data.id) },
      { $set: data }
    );

    console.log(result);

    client.close();

    res.status(201).json({ message: "invoice edited!" });
  }
}

export default handler;
