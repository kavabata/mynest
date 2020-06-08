import { Injectable } from '@nestjs/common';
import { ScenariosArgs, NewScenarioInput } from './args/scenarios.args';
import { Scenario } from './models/scenario.model';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

@Injectable()
export class ScenariosService {
  async create(data: NewScenarioInput): Promise<Scenario> {
    const { mode, sensor, controller, ...other } = data;
    const inputData = {
      ...other,
      modes: { connect: { id: mode } },
      sensors: { connect: { id: sensor } },
      controllers: { connect: { id: controller } }
    }
    
    const d = prisma.scenarios.create({ data: inputData });
    console.log('create: ', data, inputData);
    d.then((a) => console.log('create=>', a));
    return d as any;
  }

  async findOneById(id: number): Promise<Scenario> {
    const d = prisma.scenarios.findOne({ 
      where: { id: 1 },
      include: { sensors: true, modes: true, controllers: true }
    });
    console.log('findOneById: ', id);
    d.then((a) => console.log('findOneById=>', a));
    return d as any;
  }

  async findAll(sensrorArgs: ScenariosArgs): Promise<Scenario[]> {
    const d = prisma.scenarios.findMany({
      ...sensrorArgs,
      include: { sensors: true, modes: true, controllers: true }
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