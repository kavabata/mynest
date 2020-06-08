import { NotFoundException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'apollo-server-express';
import { ControllerArgs, NewControllerInput, ControllerType, ControllerState } from './args/controllers.args';
import { DeviceController } from './models/controller.model';
import { ControllerService } from './controller.service';

const pubSub = new PubSub();

@Resolver(of => DeviceController)
export class ControllerResolver {
  constructor(private readonly controllerService: ControllerService) {}

  @Query(returns => DeviceController)
  async controller(@Args('id') id: number): Promise<DeviceController> {
    const contoller = await this.controllerService.findOneById(id);
    console.log('controllerService???');
    if (!contoller) {
      // throw new NotFoundException(id);
    }
    return contoller;
  }

  @Query(returns => [DeviceController])
  controllers(@Args() contollersArgsData: ControllerArgs): Promise<DeviceController[]> {
    return this.controllerService.findAll(contollersArgsData);
  }

  @Mutation(returns => DeviceController)
  async addController(
    @Args('newControllerData') newControllerData: NewControllerInput,
  ): Promise<DeviceController> {
    const contoller = await this.controllerService.create(newControllerData);
    pubSub.publish('controllerAdded', { controllerAdded: contoller });
    return contoller;
  }

  @Mutation(returns => Boolean)
  async removeController(@Args('id') id: number) {
    return this.controllerService.remove(id);
  }

  // @Subscription(returns => DeviceController)
  // contollerAdded() {
  //   return pubSub.asyncIterator('contollerAdded');
  // }
}