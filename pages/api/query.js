const { MongoClient } = require("mongodb");
const client = new MongoClient(process.env.MONGO_DB_URI);

export default async function handler(request, response) {
  // await client.connect();
  // const collection = await client
  //   .db("stupendous-analytics")
  //   .collection("pageviews");
  //
  // await collection
  //   .updateMany({ host: "" }, { $set: { host: "Direct" } })
  //   .then(() => response.send("Good things come to those who wait."))
  //   .finally(() => client.close());
}
