import { Router } from "express";
import { deleteUserController, getProfileByIdTokenController, getUserByIdController, getUserController, updateUserController } from "./userController";
import { CatchWrapper } from "../../utils/CatchWrapper";
import { VerifyToken } from "../../middleware/verifyToken";
import { uploadImage } from "../../config/multerConfig";

const route = Router()

// route.post("/", VerifyToken, CatchWrapper(upload.single("image")), validateRequest(createUserSchema, imageSchema), CatchWrapper(createUserController))
route.get("/", VerifyToken, CatchWrapper(getUserController))
route.get("/profile", VerifyToken, CatchWrapper(getProfileByIdTokenController))
route.get("/:id", VerifyToken, CatchWrapper(getUserByIdController))
route.delete("/:id", VerifyToken, CatchWrapper(deleteUserController))
route.put("/:id", VerifyToken, CatchWrapper(uploadImage("image")), updateUserController)
// route.get("/image/:path", getImageController)

export default route