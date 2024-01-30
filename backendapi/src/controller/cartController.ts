import { NextFunction, Request, Response } from "express";
import { myDataSource } from "../datasource";
import { Cart } from "../entity/Cart";
import { idText } from "typescript";
import { User } from "../entity/User";
import { Product } from "../entity/Product";
import { In } from "typeorm";




// const getTotal = (cart: Cart, discount: number, shipping: number) => {
//     let total = 0;
//     cart.products.forEach((p) => {
//         total += (p.price * p.)
//     })
//     console.log(total)

//     let discounted = (total / 100) * (100 - discount)
//     console.log(discounted)
//     discounted += shipping


//     return (discounted)
// }


export const getCart = (req: Request, res: Response, next: NextFunction) => {
    try {
        const cartRepo = myDataSource.getRepository(Cart)

        const cart = cartRepo.findOne({ where: { id: (req as any).user.cart } })


        res.status(200).json({
            success: true,
            cart
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            error: "Internal Server error"
        })
    }
}

export const createCart = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const cartRepo = myDataSource.getRepository(Cart);


        const existingCart = await cartRepo.findOne({
            where: {
                user: {
                    id: (req as any).user.id,
                },
            },
        });

        if (existingCart) {
            return res.status(400).json({
                success: false,
                error: 'User already has a cart',
            });
        }

        // Create a new cart for the user
        const newCart = cartRepo.create({
            user: (req as any).user, // Assuming (req as any).user is a valid User entity
            total: 0, // Set other default values as needed
            discount: 0,
            shippingCharge: 40,
        });

        // Save the new cart to the database
        const result = await cartRepo.save(newCart);

        res.status(201).json({
            success: true,
            cart: result,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            error: "Internal Server error",
        });
    }
};

export const addProductToCart = async (req: Request, res: Response, next: NextFunction) => {
    try {


        const cartRepo = myDataSource.getRepository(Cart);
        const productRepo = myDataSource.getRepository(Product);

        console.log(":::::::::::::1111111111111111111111")
        const existingCart = await cartRepo.findOne({
            where: {
                user: {
                    id: (req as any).user.id,
                },
            },
        });


        console.log(":::::::::::::2222222222222222222222")

        if (!existingCart) {
            return res.status(400).json({
                success: false,
                error: 'Cart not found',
            });
        }


        existingCart.products = req.body.products


        const result = await cartRepo.save(existingCart);

        res.status(201).json({
            success: true,
            cart: result,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            error: "Internal Server error",
        });
    }
};
