import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Mode {
  @Field(type => ID)
  id: string;

  @Field()
  name: string;
}