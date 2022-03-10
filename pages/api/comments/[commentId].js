import { MongoClient } from "mongodb";

const handler = async (req, res) => {
  // const { commentId } = req.query;
  const eventId = req.query.commentId;

  const dbName = "comments";
  const url = `mongodb://aiden:mpKZGI6SibJ2JSMy@cluster0-shard-00-00.4lj4l.mongodb.net:27017,cluster0-shard-00-01.4lj4l.mongodb.net:27017,cluster0-shard-00-02.4lj4l.mongodb.net:27017/${dbName}?ssl=true&replicaSet=atlas-q1n2xs-shard-0&authSource=admin&retryWrites=true&w=majority`;

  const client = new MongoClient(url);
  await client.connect();

  const email = req.body.email;
  const name = req.body.name;
  const comment = req.body.comment;

  if (req.method === "POST") {
    // check if email, name, comments are valid
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

    try {
      const result = await db.collection("comments").insertOne(newComment);
      newComment._id = result.insertedId;
    } catch (error) {
      res.status(500).json({ message: "Not able to add to database." });
    }

    res.status(201).json({
      message: "Added comment.",
      comment: newComment,
    });
  } else {
    // req method get
    // spit out what i have
    // go to db and get all the comments
    // add the new comment at the end of the comments list
    // send them all back

    try {
      // getting the comemnts
      const db = client.db();

      // to fiiter by event
      const filter = { eventId: eventId };

      const documents = await db
        .collection("comments")
        .find(filter)
        .sort({ _id: -1 })
        .toArray();
      res.status(200).json({ comments: documents });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Not able to get comment from databse." });
      return;
    }
  }

  client.close();
};

export default handler;
