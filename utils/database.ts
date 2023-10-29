import { Db, MongoClient } from "mongodb";

export let _db: Db;
const srvUrl = "mongodb://localhost:27017/";

export const MongoConnnet = (callback: VoidFunction) => {
  MongoClient.connect(srvUrl)
    .then((client) => {
      _db = client.db("shop");
      callback();
    })
    .catch((err) => {
      console.log(err);
    });
};

/*

export const mongoClient = new MongoClient(srvUrl);

export const MongoConnnet = (callback: VoidFunction) => {
  try {
    _db = mongoClient.db("shop");
    callback();
  } catch (err) {
    throw new Error("Error while connect to Database, Message: " + err);
  }
}; 

*/
