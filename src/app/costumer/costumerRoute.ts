import { Router } from "express";
import { deleteCustomerController, getCustomerByIdController, getCustomerController, updateCustomerController, createCustomerController } from "./costumerController";
import { CatchWrapper } from "../../utils/CatchWrapper";
// import { VerifyToken } from "../../middleware/verifyToken";
// import { VerifyAdmin } from "../../middleware/verifyAdmin";

const route = Router()

// route.post("/", VerifyToken, CatchWrapper(upload.single("image")), validateRequest(createCustomerSchema, imageSchema), CatchWrapper(createCustomerController))
route.get("/", CatchWrapper(getCustomerController))
route.get("/:id", CatchWrapper(getCustomerByIdController))
route.post("/", CatchWrapper(createCustomerController))
route.put("/:id", updateCustomerController)
route.delete("/:id", CatchWrapper(deleteCustomerController))

export default route