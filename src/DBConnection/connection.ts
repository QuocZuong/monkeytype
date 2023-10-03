import { MongoClient, Admin } from "mongodb";
import dotenv from "dotenv";

dotenv.config({ path: "~/.env.development" });

const DB_CONNECTION_URL = process.env.DB_CONNECTION_URL as string;

const functions = {
  /**
 * Get the `MongoClient` from the connection string.
 * @param {string} [url] the connection string, if omited, the function will use the default connection string.
 * @returns A promise that contain a `MongoClient` if the connection is is established, undefined otherwise.
 */
  getConnection: async function (url?: string | undefined): Promise<MongoClient | undefined> {
    url = url || DB_CONNECTION_URL;

    const connection = new MongoClient(url);

    await connection.connect()
      .then((result) => { return result; })
      .catch((err) => {
        console.log(`Error while trying to connect to the database: ${err}`);
      });

    return undefined;
  },

  /**
   * Get the `Admin` of the provided instance.
   * @param {string} [db] the database instance's name, if omited, the function will create a new database instance. 
   * @returns A promise that contain an `Admin` if the connection is is established, undefined otherwise.
   */
  getAdmin: async function (url?: string | undefined, db?: string | undefined): Promise<Admin | undefined> {
    url = url || DB_CONNECTION_URL;

    const client = new MongoClient(url) as MongoClient;
    const connection = await client.connect();

    await connection.connect()
      .then((result) => { return result.db().admin() as Admin; })
      .catch((err) => {
        console.log(`Error while trying to connect to the database: ${err}`);
      });

    return undefined;
  }
}

export default functions;