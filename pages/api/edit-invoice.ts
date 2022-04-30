import { getSession } from "next-auth/react";
import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../lib/libs";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });
  if (req.method === "PUT") {
    const data = req.body;
    const client = await connectToDatabase();
    const db = client.db();

    await db.collection("users").updateOne(
      { email: session?.user?.email, "invoices.id": data.id },
      {
        $set: { "invoices.$": data },
      }
    );

    client.close();

    res.status(201).json({ message: "invoice edited!" });
  }
}

export default handler;
