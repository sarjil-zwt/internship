import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"



@Entity({ name: "Categories" })
export class Category {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    name: string

}