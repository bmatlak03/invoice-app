import { getSession } from "next-auth/react";
import { MongoClient, ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });
  console.log(session);
  if (req.method === "POST") {
    const data = req.body;

    const client = await MongoClient.connect(
      `${process.env.REACT_APP_MONGODB_URL}`
    );
    const db = client.db();

    const user = db.collection("users");

    const result = await user.updateOne(
      { email: session?.user?.email },
      { $push: { invoices: data } }
    );
    console.log(result);

    // const result = await invoicesCollection.insertOne(data);

    // console.log(result);

    client.close();

    res.status(201).json({ message: "invoice inserted!", id: req.body.id });
  }
}

export default handler;
