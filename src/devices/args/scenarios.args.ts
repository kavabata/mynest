import { ArgsType, Field, InputType, registerEnumType } from '@nestjs/graphql';
import { IsOptional, MaxLength } from 'class-validator';
import { PaginateArgs } from './common.args';

@InputType()
export class NewScenarioInput {
  @Field()
  mode: number;

  @Field()
  sensor: number;

  @Field()
  @IsOptional()
  sensor_start: number;

  @Field()
  @IsOptional()
  sensor_end: number;

  @Field()
  controller: number;
  
  @Field()
  @IsOptional()
  controller_value: number;

  @Field()
  @IsOptional()
  controller_delay: number;

  @Field()
  @IsOptional()
  sort_order: number;
}

@InputType()
class ScenariosWhereArgs {
  @Field({ nullable: true })
  mode_id: number;

  @Field({ nullable: true })
  sensor_id: number;

  @Field({ nullable: true })
  controller_id: number;
}

@ArgsType()
export class ScenariosArgs extends PaginateArgs {
  @Field({ nullable: true })
  where: ScenariosWhereArgs;
}