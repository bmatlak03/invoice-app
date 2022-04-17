import { getSession } from "next-auth/react";
import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../lib/libs";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "DELETE") {
    const session = await getSession({ req });
    const id = req.body;

    const client = await connectToDatabase();
    const db = client.db();

    const usersCollection = db.collection("users");

    const result = await usersCollection.updateOne(
      { email: session?.user?.email, "invoices.id": id },
      {
        $pull: { invoices: { id: id } },
      }
    );

    console.log(result);

    client.close();

    res.status(201).json({ message: "invoice deleted!" });
  }
}

export default handler;
