import { NotFoundException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'apollo-server-express';
import { SensorArgs, SensorType, NewSensorInput, NewSensorState } from './dto/sensors.args';
import { Sensor } from './models/sensor.model';
import { SensorService } from './sensors.service';

const pubSub = new PubSub();

@Resolver(of => Sensor)
export class SensorResolver {
  constructor(private readonly sensorService: SensorService) {}

  @Query(returns => Sensor)
  async sensor(@Args('id') id: number): Promise<Sensor> {
    const sensor = await this.sensorService.findOneById(id);
    console.log('sensorService???');
    if (!sensor) {
      // throw new NotFoundException(id);
    }
    return sensor;
  }

  @Query(returns => [Sensor])
  sensors(@Args() contollersArgsData: SensorArgs): Promise<Sensor[]> {
    return this.sensorService.findAll(contollersArgsData);
  }

  @Mutation(returns => Sensor)
  async addSensor(
    @Args('newSensorData') newSensorData: NewSensorInput,
  ): Promise<Sensor> {
    const contoller = await this.sensorService.create(newSensorData);
    pubSub.publish('sensorAdded', { sensorAdded: contoller });
    return contoller;
  }

  @Mutation(returns => Sensor)
  async addSensorState(
    @Args() NewSensorState: NewSensorState,
  ): Promise<Sensor> {
    const sensor = await this.sensorService.newState(NewSensorState);
    pubSub.publish('sensorAdded', { sensorStateAdded: sensor });
    return sensor;
  }

  @Mutation(returns => Boolean)
  async removeSensor(@Args('id') id: number) {
    return this.sensorService.remove(id);
  }

  // @Subscription(returns => Sensor)
  // contollerAdded() {
  //   return pubSub.asyncIterator('contollerAdded');
  // }
}