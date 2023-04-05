import { MongoClient } from "mongodb";
import bcrypt from "bcrypt";

export default async function handler(request, response) {
  const body = request.body;

  const client = new MongoClient(process.env.MONGO_DB_URI);
  const collection = client.db("stupendous-analytics").collection("users");
  await client.connect();

  switch (request.method) {
    case "POST":
      let user;
      user = await collection.findOne({
        email: body?.email,
      });
      if (user) {
        await client.close();

        response
          .status(422)
          .json({ title: "That email is already registered." });
      } else {
        await collection
          .insertOne({
            name: body.name,
            email: body.email.toLowerCase(),
            password: bcrypt.hashSync(body.password, 10),
            isAdmin: true,
            createdAt: new Date(),
          })
          .then(async (result) => {
            await client
              .db("stupendous-analytics")
              .collection("sites")
              .insertOne({ user: result.insertedId });

            await client
              .db("stupendous-analytics")
              .collection("accounts")
              .insertOne({ users: [result.insertedId] })
              .finally(() => {
                client.close();

                response.send("Good things come to those who wait.");
              });
          });
      }
      break;
    default:
      response.status(405).send();
  }
}
