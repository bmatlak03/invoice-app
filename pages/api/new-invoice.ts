import { getSession } from "next-auth/react";
import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../lib/db";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });
  console.log(session);
  if (req.method === "POST") {
    const data = req.body;

    const client = await connectToDatabase();
    const db = client.db();

    const user = db.collection("users");

    const result = await user.updateOne(
      { email: session?.user?.email },
      { $push: { invoices: data } }
    );
    console.log(result);

    client.close();

    res.status(201).json({ message: "invoice inserted!", id: req.body.id });
  }
}

export default handler;
