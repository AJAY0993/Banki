"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const socket_1 = __importDefault(require("./config/socket"));
const db_1 = __importDefault(require("./config/db"));
require("./services/socketService");
const PORT = process.env.PORT || 3000;
(0, db_1.default)().then(() => socket_1.default.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
}));
