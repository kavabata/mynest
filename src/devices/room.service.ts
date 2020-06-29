import { Injectable } from '@nestjs/common';
import { NewRoomInput } from './args/rooms.args';
import { PaginateArgs } from './args/common.args';
import { Room } from './models/room.model';
import { PositionInput } from './models/position.model';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

@Injectable()
export class RoomService {
  async create(data: NewRoomInput): Promise<Room> {///
    return prisma.rooms.create({ data }) as any;
  }

  async findAll(roomsArgs: PaginateArgs): Promise<Room[]> {
    return new Promise( res => {
      prisma.rooms.findMany().then(rooms => {
        const roomsFormated = rooms.map((room) => {
          const { top, left, width, height } = room;
          return {
            ...room,
            position: {
              top, left, width, height
            }
          };
        })
        console.log(roomsFormated);
        res(roomsFormated as any);
      });
    });
    
  }

  async remove(id: number): Promise<boolean> {
    await prisma.rooms_devices.deleteMany({ where: { room_id: id } });
    await prisma.rooms.delete({ where: { id } });
    return true;
  }

  async setPosition(id: number, position: PositionInput): Promise<boolean> {
    await prisma.rooms.update({
      where: { id },
      data: { ...position }
    });
    return true;
  }
}