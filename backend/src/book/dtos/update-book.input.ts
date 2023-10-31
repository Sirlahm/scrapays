import { Field, InputType } from "@nestjs/graphql";


@InputType()
export class UpdateBookInput {
    @Field()
    id:number
    
    @Field({nullable:true})
	name?: string

    @Field({nullable:true})
	description?: string
}
