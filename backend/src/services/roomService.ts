import { v4 } from "uuid"

class Room {
  static rooms: Map<string, Room> = new Map()

  roomId: string
  members: Set<string> = new Set()

  constructor(id: string) {
    this.roomId = id
    Room.rooms.set(id, this)
  }

  static createRoom(id: string): Room {
    if (!Room.rooms.has(id)) {
      return new Room(id)
    } else {
      throw new Error("Room already exists")
    }
  }

  static getRoom(id: string): Room | undefined {
    return Room.rooms.get(id)
  }

  static deleteRoom(id: string): void {
    Room.rooms.delete(id)
  }

  static isRoomAvailable(id: string): boolean {
    return Room.rooms.has(id)
  }

  joinRoom(id: string): void {
    const room = Room.getRoom(this.roomId)
    if (room) {
      if (room.members.size >= 10) {
        throw new Error("Cannot join room; it is full")
      } else {
        room.members.add(id)
      }
    } else {
      throw new Error("Room does not exist")
    }
  }

  exitRoom(id: string): void {
    this.members.delete(id)
  }
}

export default Room
