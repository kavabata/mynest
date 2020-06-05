import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Device } from './device.model';
import { Mode } from './mode.model';


@ObjectType()
export class Sensor {
  @Field(type => ID)
  id: string;

  @Field()
  device_id: string;

  @Field({ nullable: true })
  device: Device;

  @Field()
  type: string;

  @Field()
  sensor_delay: string;
}