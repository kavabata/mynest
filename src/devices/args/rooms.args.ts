import { Field, ID, InputType, ArgsType } from '@nestjs/graphql';
import { MaxLength } from 'class-validator';
import { PaginateArgs } from './common.args';
import { PositionInput } from '../models/position.model';

@InputType()
export class NewRoomInput {
  @Field()
  @MaxLength(30)
  name: string;
}

@ArgsType()
export class RoomArgs extends PaginateArgs {
}