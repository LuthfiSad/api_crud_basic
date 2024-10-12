import { Router } from "express";
import { deleteItemController, getItemByIdController, getItemController, updateItemController, createItemController } from "./itemController";
import { CatchWrapper } from "../../utils/CatchWrapper";
// import { VerifyToken } from "../../middleware/verifyToken";
// import { VerifyAdmin } from "../../middleware/verifyAdmin";

const route = Router()

// route.post("/", VerifyToken, CatchWrapper(upload.single("image")), validateRequest(createItemSchema, imageSchema), CatchWrapper(createItemController))
route.get("/", CatchWrapper(getItemController))
route.get("/:id", CatchWrapper(getItemByIdController))
route.post("/", CatchWrapper(createItemController))
route.put("/:id", updateItemController)
route.delete("/:id", CatchWrapper(deleteItemController))

export default route