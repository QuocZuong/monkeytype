import DBConnection from "~/src/DBConnection";
import { Db, MongoClient } from "mongodb"

let conn: MongoClient | undefined;
let database: Db | undefined;



const functions = {

  /**
   * This function will return all the users in the database.
   */
  getAllUser: async () => {
    const database: Db = conn?.db("monkeytype");
  }
}

async function init() {
  await DBConnection.getConnection()
    .then(result => {
      conn = result;
    }).then(result => {
      database = conn?.db();
    })
    .catch(err => console.log(`Error: ${err}`));
}