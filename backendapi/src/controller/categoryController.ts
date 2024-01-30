import { Request, Response } from "express";
import { myDataSource } from "../datasource";
import { Category } from "../entity/Category";




export const getAllCategories = async (req: Request, res: Response) => {
    try {
        const categoryRepo = myDataSource.getRepository(Category);


        const result = await categoryRepo.find();
        res.status(200).json({
            success: true,
            category: result
        });
    } catch (error) {
        console.error("Error creating product:", error.message);
        res.status(500).json({
            success: false,
            error: "Internal Server Error"
        });
    }
}


export const addCategory = async (req: Request, res: Response) => {
    try {
        const categoryRepo = myDataSource.getRepository(Category);
        const name = req.body.name;
        const newCategory = categoryRepo.create({
            name
        });

        const result = await categoryRepo.save(newCategory);
        res.status(200).json({
            success: true,
            category: result
        });
    } catch (error) {
        console.error("Error creating product:", error.message);
        res.status(500).json({
            success: false,
            error: "Internal Server Error"
        });
    }
}
export const updateCategory = async (req: Request, res: Response) => {
    try {
        const categoryRepo = myDataSource.getRepository(Category);

        const name = req.body.name;
        const updatedCategory = await categoryRepo.update({ id: req.body.id }, (req as any).body);

        res.status(200).json({
            success: true,
            category: updatedCategory
        });
    } catch (error) {
        console.error("Error creating product:", error.message);
        res.status(500).json({
            success: false,
            error: "Internal Server Error"
        });
    }
}