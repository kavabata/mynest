import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Device } from './device.model';
import { Room } from './room.model';
import { SensorType } from '../args/sensors.args';


@ObjectType()
export class Sensor {
  @Field(type => ID)
  id: string;

  @Field({ nullable: true })
  devices: Device;

  @Field({ nullable: true })
  rooms: Room;

  @Field(type => SensorType)
  type: SensorType;

  @Field()
  sensor_delay: string;

  @Field({ nullable: true })
  state?: string;
}