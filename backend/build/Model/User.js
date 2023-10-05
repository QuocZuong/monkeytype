"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class User {
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }
    getUsername() {
        return this.username;
    }
    getPassword() {
        return this.password;
    }
}
exports.default = User;
