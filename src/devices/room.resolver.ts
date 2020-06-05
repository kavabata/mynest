import { NotFoundException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'apollo-server-express';
import { NewRoomInput } from './dto/new-room.input';
import { DevicesArgs } from './dto/devices.args';
import { Room } from './models/room.model';
import { RoomService } from './room.service';

const pubSub = new PubSub();

@Resolver(of => Room)
export class RoolResolver {
  constructor(private readonly roomService: RoomService) {}

  @Query(returns => [Room])
  rooms(@Args() roomsArgs: DevicesArgs): Promise<Room[]> {
    return this.roomService.findAll(roomsArgs);
  }

  @Mutation(returns => Room)
  async addRoom(
    @Args('newRoomData') newRoomData: NewRoomInput,
  ): Promise<Room> {
    const room = await this.roomService.create(newRoomData);
    pubSub.publish('roomAdded', { roomAdded: room });
    return room;
  }

  @Mutation(returns => Boolean)
  async removeRoom(@Args('id') id: number) {
    return this.roomService.remove(id);
  }

  // @Subscription(returns => Device)
  // deviceAdded() {
  //   return pubSub.asyncIterator('deviceAdded');
  // }
}