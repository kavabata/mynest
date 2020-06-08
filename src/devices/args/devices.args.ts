import { ArgsType, Field, InputType, registerEnumType } from '@nestjs/graphql';
import { IsOptional, Length, MaxLength } from 'class-validator';
import { PaginateArgs } from './common.args';

export enum DeviceStatus {
  ONBOARD,
  ACTIVE,
  INACTIVE,
  DELETED,
}

registerEnumType(DeviceStatus, {
  name: 'DeviceStatus',
});

@InputType()
export class NewDeviceInput {
  @Field()
  @MaxLength(30)
  name: string;

  @Field({ nullable: true })
  @IsOptional()
  @Length(30, 255)
  key: string;
}

@ArgsType()
export class DevicesArgs extends PaginateArgs {
  @Field(type => DeviceStatus, { nullable: true })
  status: DeviceStatus
}