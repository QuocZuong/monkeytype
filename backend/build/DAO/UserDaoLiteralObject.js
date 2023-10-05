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
const DBConnection_1 = __importDefault(require("../DBConnection"));
let conn;
let database;
let collection;
const collectionName = "Users";
init();
const UserDao = {
    /**
     * This function will return all the users in the database.
     */
    getAllUser: function () {
        return __awaiter(this, void 0, void 0, function* () {
            const result = collection === null || collection === void 0 ? void 0 : collection.find().toArray();
            return result;
        });
    },
    createUser: function (user) {
        return __awaiter(this, void 0, void 0, function* () {
            const userInfo = {
                username: user.getUsername(),
                password: user.getPassword()
            };
            const result = collection === null || collection === void 0 ? void 0 : collection.insertOne(userInfo);
            return result;
        });
    },
    deleteUser: function (user) {
        return __awaiter(this, void 0, void 0, function* () {
            const userInfo = {
                username: user.getUsername()
            };
            const result = collection === null || collection === void 0 ? void 0 : collection.deleteOne(userInfo);
            return result;
        });
    },
    updateUser: function (user) {
        return __awaiter(this, void 0, void 0, function* () {
            const userInfo = {
                username: user.getUsername(),
                password: user.getPassword()
            };
            const result = collection === null || collection === void 0 ? void 0 : collection.updateOne(userInfo, userInfo);
            return result;
        });
    }
};
function init() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Initing connection in userDao");
        try {
            database = yield DBConnection_1.default.getConnection();
            collection = database === null || database === void 0 ? void 0 : database.collection(collectionName);
            console.log(database === null || database === void 0 ? void 0 : database.databaseName);
            console.log(collection === null || collection === void 0 ? void 0 : collection.collectionName);
        }
        catch (err) {
            console.log(`Error in UserDao.init(): ${err}`);
        }
    });
}
