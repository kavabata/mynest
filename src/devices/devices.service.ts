import { Injectable } from '@nestjs/common';
import { NewDeviceInput } from './dto/new-device.input';
import { DevicesArgs } from './dto/devices.args';
import { Device } from './models/device.model';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

@Injectable()
export class DevicesService {
  /**
   * MOCK
   * Put some real business logic here
   * Left for demonstration purposes
   */

  async create(data: NewDeviceInput): Promise<Device> {///
    const d = prisma.devices.create({ data: { ...data, status: 'ONBOARD' } });
    console.log('create: ', data);
    d.then((a) => console.log('create=>', a));
    return d as any;
  }

  async findOneById(id: number): Promise<Device> {
    const d = prisma.devices.findOne({ where: { id } });
    console.log('findOneById: ', id);
    d.then((a) => console.log('findOneById=>', a));
    return d as any;
  }

  async findAll(devicesArgs: DevicesArgs): Promise<Device[]> {
    const d = prisma.devices.findMany(devicesArgs);
    console.log('findAll: ', devicesArgs);
    d.then((a) => console.log('findAll=>', a));
    return d as any;
  }

  async remove(id: number, force = false): Promise<boolean> {
    if (force) {
      console.log('drop: ', id);
      await prisma.devices.delete({ where: { id } });
    } else {
      console.log('deleted: ', id);
      await prisma.devices.update({ where: { id }, data: { status: 'DELETED' }});
    }
    return true;
  }
}