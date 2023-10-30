import { _db } from "../utils/database";
import { ObjectId, OptionalId } from "mongodb";

export type UserProperties = {
  _id: string;
  forename: string;
  surname: string;
  age?: number;
  email: string;
};

class User {
  declare _id: OptionalId<ObjectId>;
  declare forename: string;
  declare surname: string;
  declare age?: number;
  declare email: string;

  constructor(options: UserProperties) {
    if (options._id) this._id = new ObjectId(options._id);
    this.forename = options.forename;
    this.surname = options.surname;
    if (options.age) this.age = options.age;
    this.email = options.email;
  }

  save() {
    return _db.collection("users").insertOne(this);
  }

  static findById(userId: string) {
    return _db.collection("users").findOne({ _id: new ObjectId(userId) });
  }
}

export default User;
