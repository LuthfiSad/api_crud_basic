import { Router } from "express";
import { deleteOrderController, getOrderByIdController, getOrderController, updateOrderController, createOrderController, getOrdersByProfileAndProductIdController } from "./orderController";
import { CatchWrapper } from "../../utils/CatchWrapper";
import { VerifyToken } from "../../middleware/verifyToken";
import { VerifyAdmin } from "../../middleware/verifyAdmin";

const route = Router()

// route.post("/", VerifyToken, CatchWrapper(upload.single("image")), validateRequest(createOrderSchema, imageSchema), CatchWrapper(createOrderController))
route.get("/", VerifyAdmin, CatchWrapper(getOrderController))
route.get("/profile/", VerifyToken, CatchWrapper(getOrdersByProfileAndProductIdController))
route.get("/:id", VerifyToken, CatchWrapper(getOrderByIdController))
route.post("/", VerifyToken, CatchWrapper(createOrderController))
route.put("/:id", VerifyToken, updateOrderController)
route.delete("/:id", VerifyToken, CatchWrapper(deleteOrderController))

export default route