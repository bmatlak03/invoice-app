import { getSession } from "next-auth/react";
import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../lib/libs";
import { InvoiceStatus } from "../../constants";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });

  if (req.method === "PUT") {
    const id = req.body;

    const client = await connectToDatabase();
    const db = client.db();

    await db.collection("users").updateOne(
      { email: session?.user?.email, "invoices.id": id },
      {
        $set: { "invoices.$.status": InvoiceStatus.Paid },
      }
    );
    client.close();

    res.status(201).json({ message: "Status changed!" });
  }
}

export default handler;
