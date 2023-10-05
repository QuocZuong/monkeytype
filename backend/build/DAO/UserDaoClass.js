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
class UserDao {
    constructor() {
        this.collectionName = "Users";
        this.init();
    }
    init() {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Initing connection in userDao");
            try {
                this.database = yield DBConnection_1.default.getConnection();
                this.collection = (_a = this.database) === null || _a === void 0 ? void 0 : _a.collection(this.collectionName);
                console.log((_b = this.database) === null || _b === void 0 ? void 0 : _b.databaseName);
                console.log((_c = this.collection) === null || _c === void 0 ? void 0 : _c.collectionName);
            }
            catch (err) {
                console.log(`Error in UserDao.init(): ${err}`);
            }
        });
    }
    /**
     * This function will return all the users in the database.
     */
    getAllUser() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const result = (_a = this.collection) === null || _a === void 0 ? void 0 : _a.find().toArray();
            return result;
        });
    }
    createUser(user) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const userInfo = {
                username: user.getUsername(),
                password: user.getPassword()
            };
            const result = (_a = this.collection) === null || _a === void 0 ? void 0 : _a.insertOne(userInfo);
            return result;
        });
    }
    deleteUser(user) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const userInfo = {
                username: user.getUsername()
            };
            const result = (_a = this.collection) === null || _a === void 0 ? void 0 : _a.deleteOne(userInfo);
            return result;
        });
    }
    updateUser(user) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const userInfo = {
                username: user.getUsername(),
                password: user.getPassword()
            };
            const result = (_a = this.collection) === null || _a === void 0 ? void 0 : _a.updateOne(userInfo, userInfo);
            return result;
        });
    }
}
