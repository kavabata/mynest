import { NotFoundException, assignMetadata } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription, ID } from '@nestjs/graphql';
import { PubSub } from 'apollo-server-express';
import { ParseIntPipe } from '@nestjs/common';
import { NewRoomInput, RoomArgs } from './args/rooms.args';
import { Room } from './models/room.model';
import { PositionInput } from './models/position.model';
import { RoomService } from './room.service';

const pubSub = new PubSub();

@Resolver(of => Room)
export class RoolResolver {
  constructor(private readonly roomService: RoomService) {}

  @Query(returns => [Room])
  rooms(@Args() roomsArgs: RoomArgs): Promise<Room[]> {
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

  @Mutation(returns => Boolean)
  async setRoomPosition(
    @Args({ name: 'id', type: () => ID! }, ParseIntPipe) id: number,
    @Args('roomPosition') roomPosition: PositionInput
  ): Promise<boolean> {
    return this.roomService.setPosition(id, roomPosition);
  }
}