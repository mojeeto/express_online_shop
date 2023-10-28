import { MongoClient, ServerApiVersion } from "mongodb";

const srvUrl =
  "mongodb://localhost:27017";

const client = new MongoClient(srvUrl, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const MongoConnect = () => client.connect();

export default MongoConnect;
