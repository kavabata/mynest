import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Device } from './device.model';
import { Mode } from './mode.model';

@ObjectType()
export class Room {
  @Field(type => ID)
  id: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  mode_id: string;

  @Field({ nullable: true })
  mode: Mode;

  // @Field({ nullable: true })
  // devices: [Device];
}