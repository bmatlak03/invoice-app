import { getSession } from "next-auth/react";
import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../lib/libs";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });
  if (req.method === "PUT") {
    const data = req.body;

    const client = await connectToDatabase();
    const db = client.db();

    const user = db.collection("users");

    const result = await user.updateOne(
      { email: session?.user?.email },
      { $set: { avatar: data } }
    );
    console.log(result);

    client.close();

    res.status(201).json({ message: "Avatar changed!" });
  }
}

export default handler;
