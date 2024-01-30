import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToOne, JoinColumn } from "typeorm"
import { Category } from "./Category";
var jwt = require('jsonwebtoken');



export enum UserRole {
    Admin = 'admin',
    User = 'user',
    Manager = 'manager'
}



@Entity({ name: "products" })
export class Product {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    title: string

    @Column()
    price: number

    @Column({})
    description: string

    @ManyToOne(() => Category)
    category: Category

    @Column("float", { default: 0 })
    ratingsrate: number

    @Column({ default: 0 })
    ratingscount: number

    getJWTToken() {
        return jwt.sign({ id: this.id }, "sarjil", {
            expiresIn: '3d',
        });
    }
}