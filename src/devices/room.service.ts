import { Injectable } from '@nestjs/common';
import { NewRoomInput } from './dto/new-room.input';
import { PaginateArgs } from './dto/paginate.args';
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