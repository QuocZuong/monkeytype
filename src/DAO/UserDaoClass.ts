import DBConnection from "../DBConnection";
import User from "../Model/User";
import { Collection, Db, MongoClient } from "mongodb"

class UserDao {
  private conn: MongoClient | undefined;
  private database: Db | undefined;
  private collection: Collection | undefined;

  private collectionName: string = "Users";

  constructor() {
    this.init();
  }

  async init() {
    console.log("Initing connection in userDao");

    try {
      this.database = await DBConnection.getConnection();
      this.collection = this.database?.collection(this.collectionName);

      console.log(this.database?.databaseName);
      console.log(this.collection?.collectionName);

    } catch (err) {
      console.log(`Error in UserDao.init(): ${err}`);
    }
  }

  /**
   * This function will return all the users in the database.
   */
  async getAllUser() {
    const result = this.collection?.find().toArray();
    return result;
  }

  async createUser(user: User) {
    const userInfo = {
      username: user.getUsername(),
      password: user.getPassword()
    }

    const result = this.collection?.insertOne(userInfo);
    return result;
  }

  async deleteUser(user: User) {
    const userInfo = {
      username: user.getUsername()
    }

    const result = this.collection?.deleteOne(userInfo);
    return result;
  }

  async updateUser(user: User) {
    const userInfo = {
      username: user.getUsername(),
      password: user.getPassword()
    }

    const result = this.collection?.updateOne(userInfo, userInfo);
    return result;
  }
}

