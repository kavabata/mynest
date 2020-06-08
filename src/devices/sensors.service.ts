import { Injectable } from '@nestjs/common';
import { SensorArgs, NewSensorInput, NewSensorState, SensorType } from './args/sensors.args';
import { Sensor } from './models/sensor.model';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

@Injectable()
export class SensorService {
  async create(data: NewSensorInput): Promise<Sensor> {
    const { type, device, room, sensor_delay } = data;
    const inputData = {
      type,
      enum_type: SensorType[type],
      sensor_delay, 
      devices: { connect: { id: device } },
      rooms: { connect: { id: room } }
    }
    
    const d = prisma.sensors.create({ data: inputData });
    console.log('create: ', data, inputData);
    d.then((a) => console.log('create=>', a));
    return d as any;
  }

  async newState(sensorArgs: NewSensorState): Promise<Sensor> {
    console.log(sensorArgs);
    return prisma.sensors.findOne({ where: { id: 1 } }) as any;
  }

  async findOneById(id: number): Promise<Sensor> {
    const d = prisma.sensors.findOne({ 
      where: { id: 1 },
      include: { devices: true, rooms: true }
    });
    console.log('findOneById: ', id);
    d.then((a) => console.log('findOneById=>', a));
    return d as any;
  }

  async findAll(sensrorArgs: SensorArgs): Promise<Sensor[]> {
    const d = prisma.sensors.findMany({
      ...sensrorArgs,
      include: { devices: true, rooms: true }
    });

    console.log('findAll: ', sensrorArgs);
    d.then((a) => console.log('findAll=>', a));
    return d as any;
  }

  async remove(id: number): Promise<boolean> {
    console.log('drop: ', id);
    // await prisma.controllers.delete({ where: { id } });
    return true;
  }
}