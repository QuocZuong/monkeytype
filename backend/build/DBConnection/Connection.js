"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const DB_CONNECTION_URL = process.env.DB_CONNECTION_URL;
const DB_NAME = process.env.DB_NAME;
const functions = {
    /**
   * Get the `MongoClient` from the connection string.
   * @param {string} [url] the connection string, if omited, the function will use the default connection string.
   * @returns A promise that contain a `MongoClient` if the connection is is established, undefined otherwise.
   */
    getConnection: function (url) {
        return __awaiter(this, void 0, void 0, function* () {
            url = url || DB_CONNECTION_URL;
            // console.log(`Connection string: ${url}`);
            const client = new mongodb_1.MongoClient(url);
            // console.log(`Connection established successfully, the result is: ${client}`);
            try {
                const conn = yield client.connect();
                const database = conn.db(DB_NAME);
                return database;
            }
            catch (err) {
                console.log(`Error while trying to connect to the database in Connection.getConnection(): ${err}`);
            }
        });
    },
    /**
     * Get the `Admin` of the provided instance.
     * @param {string} [db] the database instance's name, if omited, the function will create a new database instance.
     * @returns A promise that contain an `Admin` if the connection is is established, undefined otherwise.
     * @deprecated Don't use this function, the logic is wrong.
    */
    getAdmin: function (url, db) {
        return __awaiter(this, void 0, void 0, function* () {
            url = url || DB_CONNECTION_URL;
            const client = new mongodb_1.MongoClient(url);
            const connection = yield client.connect();
            yield connection.connect()
                .then((result) => { return result.db().admin(); })
                .catch((err) => {
                console.log(`Error while trying to connect to the database: ${err}`);
            });
            return undefined;
        });
    }
};
exports.default = functions;
