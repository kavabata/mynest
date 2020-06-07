import { Args, ArgsType, Field, InputType, registerEnumType } from '@nestjs/graphql';
import { IsOptional, Length, MaxLength } from 'class-validator';
import { PaginateArgs } from './common.args';

export enum ControllerState {
  DISABLED,
  ENABLED,
  INACTIVE,
  DELETED,
}
registerEnumType(ControllerState, {
  name: 'ControllerState',
});

export enum ControllerType {
  SWITCH,
  SWITCH2,
  DIMMER
}
registerEnumType(ControllerType, {
  name: 'ControllerType',
});


@InputType()
export class NewControllerInput {
  @Field()
  @MaxLength(60)
  name: string;

  @Field(type => ControllerType, { nullable: true })  
  type: ControllerType;

  @Field()
  @IsOptional()
  init: number;

  @Field()
  device: number;
}

@InputType()
class ControllerWhereArgs {
  @Field(type => ControllerState, { nullable: true })
  state: ControllerState

  @Field(type => ControllerType, { nullable: true })
  type: ControllerType

  @Field({ nullable: true })
  mode_id: number;

  @Field({ nullable: true })
  device_id: number;
}

@ArgsType()
export class ControllerArgs extends PaginateArgs {
  @Field({ nullable: true })
  where: ControllerWhereArgs;
}