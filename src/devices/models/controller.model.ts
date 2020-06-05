import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Device } from './device.model';
import { Mode } from './mode.model';


@ObjectType()
export class DeviceController {
  @Field(type => ID)
  id: string;

  @Field()
  device_id: string;

  @Field({ nullable: true })
  device: Device;

  @Field({ nullable: true })
  mode_id: string;

  @Field({ nullable: true })
  mode: Mode;

  @Field()
  controller: string;

  @Field()
  name: string;

  @Field()
  controller_default: string;
}