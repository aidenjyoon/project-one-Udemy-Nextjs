import { MongoClient } from "mongodb";

const handler = async (req, res) => {
  // const { commentId } = req.query;
  const eventId = req.query.commentId;

  const dbName = "comments";
  const url = `mongodb://aiden:mpKZGI6SibJ2JSMy@cluster0-shard-00-00.4lj4l.mongodb.net:27017,cluster0-shard-00-01.4lj4l.mongodb.net:27017,cluster0-shard-00-02.4lj4l.mongodb.net:27017/${dbName}?ssl=true&replicaSet=atlas-q1n2xs-shard-0&authSource=admin&retryWrites=true&w=majority`;

  const client = new MongoClient(url);

  const email = req.body.email;
  const name = req.body.name;
  const comment = req.body.comment;
  console.log(req.body);

  if (req.method === "POST") {
    await client.connect();

    if (
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !comment ||
      comment.trim() === ""
    ) {
      res.status(422).json({ message: "Invalid input." });
      client.close();
      return;
    }

    // should send to db
    const newComment = {
      email,
      name,
      comment,
      eventId,
    };

    const db = client.db(dbName);

    const result = await db.collection("comments").insertOne(newComment);

    newComment.id = result.insertedId;

    res.status(201).json({
      message: "Added comment.",
      comment: newComment,
    });
  } else {
    // spit out what i have

    // go to db and get all the comments
    // add the new comment at the end of the comments list
    // send them all back

    const db = client.db();

    const documents = await db
      .collection("comments")
      .find()
      .sort({ _id: -1 })
      .toArray();

    res.status(200).json({ comments: "has worked", name: "author of comment" });
  }
};

export default handler;
