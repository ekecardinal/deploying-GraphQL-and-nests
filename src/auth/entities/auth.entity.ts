import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Auth {
  @Field()
  exampleField: string;
}
