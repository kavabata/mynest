import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Device {
  @Field(type => ID)
  id: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  key: string;

  @Field({ nullable: true })
  ip: string;

  @Field({ nullable: true })
  created: Date;
}