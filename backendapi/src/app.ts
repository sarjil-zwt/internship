import * as express from "express"
import { myDataSource } from "./datasource";
const cookieparser = require("cookie-parser")


require("dotenv").config()


const app = express();
const port = 3000;

app.use(express.json());
app.use(cookieparser())

app.get("/", (req, res) => {
    res.send("Hello, welcome to the TypeORM REST API!");
});

import userRoute from "./route/userRoute"
import authRoute from "./route/authRoute"
import productRoute from "./route/productRoute"
import categoryRoute from "./route/categoryRoute"
import cartRoute from "./route/cartRoute"



app.use("/users", userRoute)
app.use("/auth", authRoute)
app.use('/products', productRoute)
app.use('/categories', categoryRoute)
app.use('/cart', cartRoute)




myDataSource.initialize().then(() => {
    app.listen(port, () => {
        console.log(`Server is running at http://localhost:${port}`);
    });
});
