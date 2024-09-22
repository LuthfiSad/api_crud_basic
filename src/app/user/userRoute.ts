import { Router } from "express";
import { getUserController } from "./userController";
import { CatchWrapper } from "utils/CatchWrapper";
import { VerifyToken } from "middleware/verifyToken";

const route = Router()

// route.post("/", VerifyToken, CatchWrapper(upload.single("image")), validateRequest(createUserSchema, imageSchema), CatchWrapper(createUserController))
route.get("/", VerifyToken, CatchWrapper(getUserController))
// route.delete("/:id", VerifyToken, CatchWrapper(deleteUserController))
// route.put("/:id", VerifyToken, CatchWrapper(upload.single("image")), updateUserController)
// route.get("/:id", CatchWrapper(getDetailUserController))

export default route