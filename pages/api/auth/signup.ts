import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase, hashPassword } from "../../../lib/libs";
async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { email, password } = req.body;
    if (!email || !email.includes("@") || !password) {
      res.status(422).json({ message: "Invalid Data" });
      return;
    }
    const client = await connectToDatabase();
    const db = client.db();

    const checkExisting = await db
      .collection("users")
      .findOne({ email: email });

    if (checkExisting) {
      res.status(422).json({ message: "User already exists" });
      client.close();
      return;
    }
    const status = await db.collection("users").insertOne({
      email,
      password: await hashPassword(password),
      invoices: [],
      avatar: "",
    });

    res.status(201).json({ message: "User created", ...status });
    client.close();
  } else {
    res.status(500).json({ message: "Route not valid" });
  }
}

export default handler;
