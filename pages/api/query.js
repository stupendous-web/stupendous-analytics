const { MongoClient } = require("mongodb");
const client = new MongoClient(process.env.MONGO_DB_URI);

export default async function handler(request, response) {
  response.status(200).json("Good things come to those who wait.");

  /*

  await client.connect();

  const result = await client
    .db("stupendous-analytics")
    .collection("pageviews")
    .updateMany({}, { $rename: { created_at: "createdAt" } })
    .finally(() => client.close());


   */
}
