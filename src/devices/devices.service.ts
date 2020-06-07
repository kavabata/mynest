import { Injectable } from '@nestjs/common';
import { DevicesArgs, NewDeviceInput, DeviceStatus } from './dto/devices.args';
import { Device } from './models/device.model';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

@Injectable()
export class DevicesService {
  async create(data: NewDeviceInput): Promise<Device> {
    const d = prisma.devices.create({ data: { ...data, status: DeviceStatus.ONBOARD } });
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
    const { skip, take, status } = devicesArgs;

    const d = prisma.devices.findMany({ skip, take, where: { status } });
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
      await prisma.devices.update({ where: { id }, data: { status: DeviceStatus.DELETED }});
    }
    return true;
  }
}