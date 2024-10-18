import { Router } from "express";
import { CatchWrapper } from "../../utils/CatchWrapper";
import { loginController, registerController } from "./authController";
import { uploadImage } from "../../config/multerConfig";

const route = Router()

// route.post("/", VerifyToken, CatchWrapper(upload.single("image")), validateRequest(createUserSchema, imageSchema), CatchWrapper(createUserController))
route.post("/register", CatchWrapper(uploadImage("user")), CatchWrapper(registerController))
route.post("/login", CatchWrapper(loginController))
// route.delete("/:id", VerifyToken, CatchWrapper(deleteUserController))
// route.put("/:id", VerifyToken, CatchWrapper(upload.single("image")), updateUserController)
// route.get("/:id", CatchWrapper(getDetailUserController))

export default route