import { Injectable } from '@nestjs/common';
import { ControllerArgs, NewControllerInput } from './dto/controllers.args';
import { DeviceController } from './models/controller.model';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

@Injectable()
export class ControllerService {
  async create(data: NewControllerInput): Promise<DeviceController> {

    const { name, type, init, device } = data;
    const inputData = { name, init, type, device_id: device, devices: null}
    
    const d = prisma.controllers.create({ data: inputData });
    console.log('create: ', data, inputData);
    d.then((a) => console.log('create=>', a));
    return d as any;
  }

  async findOneById(id: number): Promise<DeviceController> {
    const d = prisma.controllers.findOne({ 
      where: { id }, 
      include: { devices: true, modes: true }
    });
    console.log('findOneById: ', id);
    d.then((a) => console.log('findOneById=>', a));
    return d as any;
  }

  async findAll(controllerArgs: ControllerArgs): Promise<DeviceController[]> {
    const d = prisma.controllers.findMany({
      ...controllerArgs,
      include: { devices: true, modes: true }
    });

    console.log('findAll: ', controllerArgs);
    d.then((a) => console.log('findAll=>', a));
    return d as any;
  }

  async remove(id: number): Promise<boolean> {
    console.log('drop: ', id);
    await prisma.controllers.delete({ where: { id } });
    return true;
  }
}