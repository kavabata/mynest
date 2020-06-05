import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Sensor } from './sensor.model';
import { Mode } from './mode.model';
import { DeviceController } from './controller.model';


@ObjectType()
export class Controller {
  @Field(type => ID)
  id: string;

  @Field({ nullable: true })
  mode_id: string;

  @Field({ nullable: true })
  mode: Mode;

  @Field()
  sensor_id: string;

  @Field({ nullable: true })
  sensor: Sensor;

  @Field()
  sensor_start: string;

  @Field()
  sensor_end: string;

  @Field()
  contoller_id: string;

  @Field({ nullable: true })
  controller: DeviceController;

  @Field()
  contoller_value: string;

  @Field()
  contoller_delay: string;

  @Field()
  sort_order: string;
}