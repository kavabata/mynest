import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { MaxLength } from 'class-validator';
import { PaginateArgs } from './common.args';

@InputType()
export class NewModeInput {
  @Field()
  @MaxLength(60)
  name: string;
}

@ArgsType()
export class ModeArgs extends PaginateArgs {
}