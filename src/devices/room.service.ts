import { Injectable } from '@nestjs/common';
import { NewRoomInput } from './args/rooms.args';
import { PaginateArgs } from './args/common.args';
import { Room } from './models/room.model';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

@Injectable()
export class RoomService {
  async create(data: NewRoomInput): Promise<Room> {///
    return prisma.rooms.create({ data }) as any;
  }

  async findAll(roomsArgs: PaginateArgs): Promise<Room[]> {
    return prisma.rooms.findMany() as any; // @TODO: args here
  }

  async remove(id: number): Promise<boolean> {
    await prisma.rooms_devices.deleteMany({ where: { room_id: id } });
    await prisma.rooms.delete({ where: { id } });
    return true;
  }
}