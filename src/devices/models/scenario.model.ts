import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Sensor } from './sensor.model';
import { Mode } from './mode.model';
import { DeviceController } from './controller.model';


@ObjectType()
export class Scenario {
  @Field(type => ID)
  id: string;

  @Field({ nullable: true })
  mode_id: number;

  @Field({ nullable: true })
  modes: Mode;

  @Field()
  sensor_id: number;

  @Field()
  sensors: Sensor;

  @Field({ nullable: true })
  sensor_start: number;

  @Field({ nullable: true })
  sensor_end: number;

  @Field()
  contoller_id: number;

  @Field()
  controllers: DeviceController;

  @Field({ nullable: true })
  controller_value: number;

  @Field({ nullable: true })
  controller_delay: number;

  @Field()
  sort_order: number;
}