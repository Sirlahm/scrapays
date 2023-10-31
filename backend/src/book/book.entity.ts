import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Field,Int, ObjectType } from "@nestjs/graphql";

@Entity()
@ObjectType()
export default class Book{
    @PrimaryGeneratedColumn()
    @Field((type) => Int)
    id: number

    @Column()
    @Field() 
	name: string

    @Column()
    @Field()
	description: string

    @Field()
    @CreateDateColumn({ name: 'created_at' })
    Date:Date
}