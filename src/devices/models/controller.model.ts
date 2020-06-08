import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Device } from './device.model';
import { Mode } from './mode.model';
import { ControllerType, ControllerState } from '../args/controllers.args';

@ObjectType()
export class DeviceController {
  @Field(type => ID)
  id: string;

  @Field()
  device_id: string;

  @Field({ nullable: true })
  devices: Device;

  @Field({ nullable: true })
  mode_id: string;

  @Field({ nullable: true })
  modes: Mode;

  @Field(type => ControllerType)
  type: ControllerType;

  @Field()
  name: string;

  @Field()
  init: string;

  @Field(type => ControllerState)
  state: ControllerState;
}