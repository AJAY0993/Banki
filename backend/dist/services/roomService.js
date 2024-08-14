"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Room {
    constructor(id) {
        this.members = new Set();
        this.roomId = id;
        Room.rooms.set(id, this);
    }
    static createRoom(id) {
        if (!Room.rooms.has(id)) {
            return new Room(id);
        }
        else {
            throw new Error("Room already exists");
        }
    }
    static getRoom(id) {
        return Room.rooms.get(id);
    }
    static deleteRoom(id) {
        Room.rooms.delete(id);
    }
    static isRoomAvailable(id) {
        return Room.rooms.has(id);
    }
    joinRoom(id) {
        const room = Room.getRoom(this.roomId);
        if (room) {
            if (room.members.size >= 10) {
                throw new Error("Cannot join room; it is full");
            }
            else {
                room.members.add(id);
            }
        }
        else {
            throw new Error("Room does not exist");
        }
    }
    exitRoom(id) {
        this.members.delete(id);
    }
}
Room.rooms = new Map();
exports.default = Room;
