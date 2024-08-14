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
const uuid_1 = require("uuid");
const socket_1 = require("../config/socket");
const roomService_1 = __importDefault(require("./roomService"));
const getRandomNumber_1 = __importDefault(require("../utils/getRandomNumber"));
const data_1 = __importDefault(require("../utils/data"));
socket_1.io.on("connection", (socket) => {
    console.log("A user joined");
    socket.on("event:createRoom", () => {
        const newRoom = roomService_1.default.createRoom((0, uuid_1.v4)());
        socket.emit("event:roomCreated", newRoom.roomId);
    });
    socket.on("event:joinRoom", (roomId) => {
        var _a;
        // join room with the socketId
        // catch the error
        try {
            (_a = roomService_1.default.getRoom(roomId)) === null || _a === void 0 ? void 0 : _a.joinRoom(socket.id);
            socket.join(roomId);
            socket.emit("event:roomJoined", roomId);
            socket_1.io.in(roomId).emit("event:userJoined");
        }
        catch (error) {
            socket.emit("event:error", error);
        }
    });
    socket.on("event:checkRoom", (roomId) => {
        // check if room is available
        // catch the error
        try {
            const t = roomService_1.default.isRoomAvailable(String(roomId));
            if (t) {
                socket.emit("event:roomChecked", { available: true });
                socket.join(roomId);
            }
            else if (!t) {
                socket.emit("event:roomChecked", { avaiable: false });
            }
            socket_1.io.in(roomId).emit("event:userJoined");
        }
        catch (error) {
            socket.emit("event:error", error);
        }
    });
    socket.on("event:exitRoom", (roomId) => {
        var _a;
        // join room with the socketId
        // catch the error
        console.log("exit");
        try {
            (_a = roomService_1.default.getRoom(roomId)) === null || _a === void 0 ? void 0 : _a.exitRoom(socket.id);
            socket.leave(roomId);
            socket.emit("event:roomExited", roomId);
            socket_1.io.in(roomId).emit("event:userExited");
        }
        catch (error) {
            socket.emit("event:", error);
        }
    });
    socket.on("event:deleteRoom", (roomId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            console.log("delete");
            roomService_1.default.deleteRoom(roomId);
            const sockets = yield socket_1.io.in(roomId).fetchSockets();
            sockets.forEach((s) => {
                s.emit("event:roomDeleted", roomId);
                s.leave(roomId);
            });
            socket.emit("event:roomDeleted", roomId);
        }
        catch (error) {
            socket.emit("event:error", error);
        }
    }));
    socket.on("event:next", (roomId) => __awaiter(void 0, void 0, void 0, function* () {
        // generate a romdom index
        const i = (0, getRandomNumber_1.default)(0, data_1.default.length - 1);
        socket_1.io.in(roomId).emit("event:next", i);
    }));
    socket.on("event:message", handleLiveChat);
});
const handleLiveChat = ({ roomId, message, userId, username }) => {
    socket_1.io.in(roomId).emit("event:message", { message, userId, username });
};
