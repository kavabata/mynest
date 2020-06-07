import { NotFoundException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'apollo-server-express';
// import { NewDeviceInput } from './dto/new-device.input';
import { DevicesArgs, NewDeviceInput } from './dto/devices.args';
import { Device } from './models/device.model';
import { DevicesService } from './devices.service';

const pubSub = new PubSub();

@Resolver(of => Device)
export class DevicesResolver {
  constructor(private readonly devicesService: DevicesService) {}

  @Query(returns => Device)
  async device(@Args('id') id: number): Promise<Device> {
    const device = await this.devicesService.findOneById(id);
    console.log('device???');
    if (!device) {
      // throw new NotFoundException(id);
    }
    return device;
  }

  @Query(returns => [Device])
  devices(@Args() devicesArgs: DevicesArgs): Promise<Device[]> {
    return this.devicesService.findAll(devicesArgs);
  }

  @Mutation(returns => Device)
  async addDevice(
    @Args('newDeviceData') newDeviceData: NewDeviceInput,
  ): Promise<Device> {
    const device = await this.devicesService.create(newDeviceData);
    pubSub.publish('deviceAdded', { deviceAdded: device });
    return device;
  }

  @Mutation(returns => Boolean)
  async removeDevice(@Args('id') id: number, @Args('force') force: boolean) {
    return this.devicesService.remove(id, force);
  }

  @Subscription(returns => Device)
  deviceAdded() {
    return pubSub.asyncIterator('deviceAdded');
  }
}