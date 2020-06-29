import { Field, ObjectType, InputType } from '@nestjs/graphql';

@ObjectType({ isAbstract: true })
export class Position {
  @Field({ nullable: true })
  top: number;

  @Field({ nullable: true })
  left: number;

  @Field({ nullable: true })
  width: number;

  @Field({ nullable: true })
  height: number;
}

@InputType()
export class PositionInput extends Position {
  @Field({ nullable: true })
  top: number;

  @Field({ nullable: true })
  left: number;

  @Field({ nullable: true })
  width: number;

  @Field({ nullable: true })
  height: number;
}

@ObjectType()
export class PositionObject extends Position {}

