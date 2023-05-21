import Cors from "cors";
const { MongoClient } = require("mongodb");

const cors = Cors({
  methods: ["POST", "GET", "HEAD"],
});

// Cors
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

export default async function handler(request, response) {
  await runMiddleware(request, response, cors);

  const body = request?.body;
  const query = request?.query;

  const client = new MongoClient(process.env.MONGO_DB_URI);
  const collection = client.db("stupendous-analytics").collection("pageviews");

  await client.connect();

  switch (request.method) {
    case "GET":
      await collection
        .aggregate([
          {
            $match: {
              site: query?.site,
              createdAt: {
                $gt: new Date(query?.startDate),
                $lt: new Date(query?.endDate),
              },
              hostname: { $ne: "localhost" },
              ...(query?.host ? { host: query?.host } : {}),
            },
          },
        ])
        .toArray()
        .then((results) => response.json(results))
        .finally(() => client.close());

      break;
    case "POST":
      if (body) {
        const result = await collection.insertOne({
          ...body,
          localTimestamp: new Date(body?.localTimestamp),
          createdAt: new Date(),
        });
        await client.close();
        response.status(200).json(result);
      } else {
        response.status(200).send("Good things come to those who wait.");
      }

      break;
  }
}
