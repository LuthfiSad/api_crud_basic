import { Router, type Request, type Response } from "express";
import { MESSAGES } from "../utils/Messages";
import userRoute from "../app/user/userRoute";
import authRoute from "../app/auth/authRoute";
import productRoute from "../app/product/productRoute";
import orderRoute from "../app/order/orderRoute";
import { MESSAGE_CODE } from "../utils/MessageCode";

const route = Router();

route.use("/users", userRoute)
route.use("/auth", authRoute)
route.use("/products", productRoute)
route.use("/orders", orderRoute)

route.get("/", (req: Request, res: Response) => {
    return res.json({ message: "Hello World 🚀" })
})

route.use("*", (req: Request, res: Response) => {
    return res.status(404).json({
        status: 404,
        code: MESSAGE_CODE.NOT_FOUND,
        message: MESSAGES.ERROR.NOT_FOUND.ROUTE
    })
})

export default route