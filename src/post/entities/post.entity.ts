import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Post {
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column("text")
    title:string;

    @Column("text")
    body:string
    // this can be sued to create a post with some of the filedsabove 
    constructor(post:Partial<Post>){
        Object.assign(this,post)
    }

}
