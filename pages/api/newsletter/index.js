import { MongoClient } from "mongodb";

const handler = async (req, res) => {
  const userEmail = req.body.email;

  // validate email
  if (!userEmail || !userEmail.includes("@")) {
    res.status(422).json({ message: "Invalid email address." });
    return;
  }

  // Database Name
  const dbName = "newsletter";

  // Connection URL
  const url = `mongodb://aiden:mpKZGI6SibJ2JSMy@cluster0-shard-00-00.4lj4l.mongodb.net:27017,cluster0-shard-00-01.4lj4l.mongodb.net:27017,cluster0-shard-00-02.4lj4l.mongodb.net:27017/${dbName}?ssl=true&replicaSet=atlas-q1n2xs-shard-0&authSource=admin&retryWrites=true&w=majority`;

  const client = new MongoClient(url);

  try {
    await client.connect();
    console.log("Connected correctly to server");
  } catch (err) {
    res.status(500).json({ message: "Connecting to database has failed." });
    return;
  }

  try {
    const db = client.db(dbName);

    const date = new Date().toUTCString();

    await db
      .collection("emails")
      .insertOne({ email: userEmail, dateRegistered: date });
    res
      .status(201)
      .json({ email: userEmail, message: `${userEmail} was signed up!` });
  } catch (error) {
    res.status(500).json("Email has not been added to the database.");
  }

  client.close();
};

export default handler;
