import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm"
import { Cart } from "./Cart";
var jwt = require('jsonwebtoken');



export enum UserRole {
    Admin = 'admin',
    User = 'user',
    Manager = 'manager'
}



@Entity({ name: "users" })
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({ nullable: false })
    name: string

    @Column({ unique: true, nullable: false })
    email: string

    @Column({ nullable: false })
    password: string

    @Column({
        type: 'enum',
        enum: UserRole,
        default: UserRole.User,
        nullable: false
    })
    role: UserRole

    @OneToOne(() => Cart, cart => cart.user)
    @JoinColumn()
    cart: Cart



    getJWTToken() {
        return jwt.sign({ id: this.id }, "sarjil", {
            expiresIn: '3d',
        });
    }
}