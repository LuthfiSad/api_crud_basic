import { Router } from "express";
import { deleteProductController, getImageController, getProductByIdController, getProductController, updateProductController, createProductController } from "./productController";
import { CatchWrapper } from "../../utils/CatchWrapper";
import { VerifyToken } from "../../middleware/verifyToken";
import { upload } from "../../config/multerConfig";

const route = Router()

// route.post("/", VerifyToken, CatchWrapper(upload.single("image")), validateRequest(createProductSchema, imageSchema), CatchWrapper(createProductController))
route.get("/", VerifyToken, CatchWrapper(getProductController))
route.get("/:id", VerifyToken, CatchWrapper(getProductByIdController))
route.post("/", VerifyToken, CatchWrapper(upload.single("image")), CatchWrapper(createProductController))
route.put("/:id", VerifyToken, CatchWrapper(upload.single("image")), updateProductController)
route.delete("/:id", VerifyToken, CatchWrapper(deleteProductController))
route.get("/image/:path", getImageController)

export default route