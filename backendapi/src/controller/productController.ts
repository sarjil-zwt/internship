import { NextFunction, Request, Response } from "express";
import { myDataSource } from "../datasource";
import { Product } from "../entity/Product";
import ErrorHandler from "../utils/errorhander";


export const getAllProducts = async (req: Request, res: Response) => {
    try {
        const productRepository = myDataSource.getRepository(Product);


        const result = await productRepository.find();


        res.status(200).json({
            success: true,
            products: result
        });
    } catch (error) {
        console.error("Error creating product:", error.message);
        res.status(500).json({
            success: false,
            error: "Internal Server Error"
        });
    }
}

export const addProduct = async (req: Request, res: Response) => {
    try {
        const productRepository = myDataSource.getRepository(Product);

        const title = req.body.title;
        const price = req.body.price;
        const description = req.body.description;
        const category = req.body.category
        const newProduct = productRepository.create({
            title, price, description, category
        });

        const result = await productRepository.save(newProduct);


        res.status(201).json({
            success: true,
            product: result
        });

    } catch (error) {
        console.error("Error creating product:", error.message);
        res.status(500).json({
            success: false,
            error: "Internal Server Error"
        });
    }
}

export const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const productRepository = myDataSource.getRepository(Product);


        const product = await productRepository.findOne({ where: { id: req.body.id } })

        if (!product) {
            return next(new ErrorHandler("Product not found", 404));
        }


        const updatedProduct = await productRepository.update({ id: req.body.id }, req.body)

        res.status(201).json({
            success: true,
            product: updatedProduct
        });
    } catch (error) {
        console.error("Error creating product:", error.message);
        res.status(500).json({
            success: false,
            error: "Internal Server Error"
        });
    }
}

