import DBConnection from "~/src/DBConnection";
import User from "~/src/Model/User";
import { Collection, Db, MongoClient, ObjectId } from "mongodb"
import { fileURLToPath } from "url";

let database: Db | undefined;
let collection: Collection | undefined;
const collectionName: string = "Users";

init();

const UserDao = {
  /**
   * This function will return all the users in the database.
   */
  getAllUser: async function () {
    const result = collection?.find().toArray();
    return result;
  },

  createUser: async function (user: User) {
    const userInfo = {
      username: user.getUsername(),
      password: user.getPassword()
    }

    const result = collection?.insertOne(userInfo);
    return result;
  },

  deleteUserById: async function (id: string) {
    const userInfo = {
      _id: new ObjectId(id)
    }

    const result = collection?.deleteOne(userInfo);
    return result;
  },
  // deleteUser: async function (user: User) {},

  deleteUser: async (user: User) => {
    const userInfo = {
      username: user.getUsername()
    }

    const result = collection?.deleteOne(userInfo);
    return result;
  },

  updateUser: async function (user: User) {
    const userInfo = {
      username: user.getUsername(),
      password: user.getPassword()
    }

    const result = collection?.updateOne(userInfo, userInfo);
    return result;
  }
}

async function init() {
  console.log("Initing connection in userDao");

  try {
    database = await DBConnection.getConnection();
    collection = database?.collection(collectionName);

    console.log(database?.databaseName);
    console.log(collection?.collectionName);

  } catch (err) {
    console.log(`Error in UserDao.init(): ${err}`);
  }
}

export default UserDao;

