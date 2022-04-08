import { MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { email, password } = req.body;
    if (!email || !email.includes("@") || !password) {
      res.status(422).json({ message: "Invalid Data" });
      return;
    }
    const client = await MongoClient.connect(
      `mongodb+srv://bartek:${process.env.REACT_APP_MONGODB_PASS}@cluster0.j0lnf.mongodb.net/invoicesDatabase?retryWrites=true&w=majority`
    );
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
      password: password,
    });

    res.status(201).json({ message: "User created", ...status });
    //Close DB connection
    client.close();
  } else {
    //Response for other than POST method
    res.status(500).json({ message: "Route not valid" });
  }
}

export default handler;
