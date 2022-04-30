import { getSession } from "next-auth/react";
import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../lib/libs";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });
  if (req.method === "POST") {
    const data = req.body;

    const client = await connectToDatabase();
    const db = client.db();

    const user = db.collection("users");

    await user.updateOne(
      { email: session?.user?.email },
      { $push: { invoices: data } }
    );

    client.close();

    res.status(201).json({ message: "invoice inserted!", id: req.body.id });
  }
}

export default handler;
