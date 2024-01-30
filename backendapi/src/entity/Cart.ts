import { Entity, Column, PrimaryGeneratedColumn, OneToOne, OneToMany, ManyToMany, JoinTable, JoinColumn } from "typeorm"
import { User } from "./User";
import { Product } from "./Product";


@Entity({ name: "cart" })
export class Cart {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    total: number

    @Column("float", { default: 0 })
    discount: number

    @Column("float", { default: 40 })
    shippingCharge: number

    @OneToOne(() => User)
    @JoinColumn()
    user: User


    // @ManyToMany(() => Product)
    // @JoinTable({
    //     name: 'cart_products',
    //     joinColumn: { name: 'cart_id', referencedColumnName: 'id' },
    //     inverseJoinColumn: { name: 'product_id', referencedColumnName: 'id' },
    // })
    // products: Product[]

    @Column({ type: 'json' })
    products: Array<object>;

}