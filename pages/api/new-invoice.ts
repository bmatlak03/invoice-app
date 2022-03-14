import { MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

// /api/new-invoice
// POST /api/new-invoice

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const data = req.body;

    const client = await MongoClient.connect(
      `mongodb+srv://bartek:${process.env.REACT_APP_MONGODB_PASS}@cluster0.j0lnf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
    );
    const db = client.db();

    const invoicesCollection = db.collection("invoices");

    const result = await invoicesCollection.insertOne(data);

    console.log(result);

    client.close();

    res.status(201).json({ message: "invoice inserted!" });
  }
}

export default handler;
