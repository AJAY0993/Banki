"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = void 0;
const node_http_1 = __importDefault(require("node:http"));
const socket_io_1 = require("socket.io");
const app_1 = __importDefault(require("../app"));
const server = node_http_1.default.createServer(app_1.default);
exports.io = new socket_io_1.Server(server, {
    cors: {
        origin: process.env.WHITELIST_ORIGIN
    }
});
exports.default = server;
