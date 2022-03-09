import { MongoClient } from "mongodb";

const handler = (req, res) => {
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

  async function run() {
    try {
      await client.connect();
      console.log("Connected correctly to server");

      const db = client.db(dbName);

      await db.collection("emails").insertOne({ email: userEmail });

      res.status(201).json({ message: "Signed up!" });
    } catch (err) {
      console.log("ERROR");
      console.log(err.stack);
      console.log("------");
    } finally {
      await client.close();
    }
  }
  run(); //.catch(console.dir);

  res
    .status(200)
    .json({ email: userEmail, message: `${userEmail} was received` });
};

export default handler;
