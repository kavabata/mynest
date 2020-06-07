import { Field, ID, ObjectType } from '@nestjs/graphql';
import { DeviceStatus } from '../dto/devices.args'

@ObjectType()
export class Device {
  @Field(type => ID)
  id: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  key: string;

  @Field({ nullable: true })
  ip: string;

  @Field(type => DeviceStatus)
  status: DeviceStatus;

  @Field({ nullable: true })
  created: Date;
}