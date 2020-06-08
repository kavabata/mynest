import { ArgsType, Field, InputType, registerEnumType } from '@nestjs/graphql';
import { IsOptional, MaxLength } from 'class-validator';
import { PaginateArgs } from './common.args';

export enum SensorType {
  TIME,
  PIR,
  LIGHTLEVEL,
  TEMPERATURE,
  HUMIDITY
}
registerEnumType(SensorType, {
  name: 'SensorType',
});


@InputType()
export class NewSensorInput {
  @Field(type => SensorType)  
  type: SensorType;

  @Field()
  @IsOptional()
  sensor_delay: number;

  @Field()
  device: number;
  
  @Field()
  room: number;
}

@ArgsType()
export class NewSensorState {
  @Field(type => SensorType)  
  type: SensorType;

  @Field()
  key: string;

  @Field()
  value: number;
}

@InputType()
class SensorWhereArgs {
  @Field(type => SensorType, { nullable: true })
  type: SensorType

  @Field({ nullable: true })
  room_id: number;

  @Field({ nullable: true })
  device_id: number;
}

@ArgsType()
export class SensorArgs extends PaginateArgs {
  @Field({ nullable: true })
  where: SensorWhereArgs;
}