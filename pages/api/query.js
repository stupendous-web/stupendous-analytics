const { MongoClient } = require("mongodb");
const client = new MongoClient(process.env.MONGO_DB_URI);

export default async function handler(request, response) {
  // await client.connect();
  // const collection = await client
  //   .db("stupendous-analytics")
  //   .collection("pageviews");
  //
  // await collection
  //   .updateMany(
  //     { site: "topher@stupendousweb.com" },
  //     { $set: { site: "642cf18729b904f37d859011" } }
  //   )
  //   .then(() => response.send("Good things come to those who wait."))
  //   .finally(() => client.close());
  //
  //   await collection
  //   .updateMany({}, { $rename: { created_at: "createdAt" } })
  //   .then(() => response.send("Good things come to those who wait."))
  //   .finally(() => client.close());
}
