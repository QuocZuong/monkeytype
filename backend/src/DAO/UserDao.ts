import DBConnection from "../DBConnection";
import User from "../Model/User";
import { Collection, Db, ObjectId } from "mongodb"

let database: Db | undefined;
let collection: Collection | undefined;
const collectionName: string = "Users";

init();

const UserDao = {

  /**
   * This function will return all the users in the database.
   */
  getAllUsers: async function () {
    const result = collection?.find().toArray();
    return result;
  },

  createUser: async function (user: User) {
    if (!user) {
      return null;
    }

    if (user.username === "" || user.username === "") {
      return null;
    }

    const isDuplicatedUsername = (await UserDao.getUserByUsername(user.username)) ? true : false;
    const isDuplicatedEmail = (await UserDao.getUserByEmail(user.email)) ? true : false;

    if (isDuplicatedUsername || isDuplicatedEmail) {
      return null;
    }
    
    const result = collection?.insertOne(user);
    return result;
  },

  deleteUserById: async function (id: string) {
    if (!id) {
      return null;
    }

    const userInfo = {
      _id: new ObjectId(id)
    }

    const result = collection?.deleteOne(userInfo);
    return result;
  },

  deleteUser: async (user: User) => {
    if (!user) {
      return null;
    }

    const userInfo = {
      username: user.username
    }
    
    const result = collection?.deleteOne(userInfo);
    return result;
  },

  updateUser: async function (user: User) {
    if (!user) {
      return null;
    }

    const userInfo = {
      ...user
    }

    const result = collection?.updateOne(userInfo, userInfo);
    return result;
  },

  getUser: async function (user: User) {
    if (!user) {
      return null;
    }

    return collection?.findOne(user);
  },

  getUserByUsername: async function (username: string) {
    if (!username || username === "") {
      return null;
    }

    const userInfo = {
      username: username
    }

    return collection?.findOne(userInfo);
  },

  getUserByEmail: async function (email: string) {
    if (!email || email === "") {
      return null;
    }

    const userInfo = {
      email: email
    }

    return collection?.findOne(userInfo);
  }
}

async function init() {
  console.log("Initing connection in userDao");

  try {
    database = await DBConnection.getConnection();
    collection = database?.collection(collectionName);

    console.log(`Connecting to database: ${database?.databaseName}`);
    console.log(`Connecting to collection: ${collection?.collectionName}`);

  } catch (err) {
    console.log(`Error in UserDao.init(): ${err}`);
  }
}

export default UserDao;

