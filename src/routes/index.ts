import { Router, type Request, type Response } from "express";
import { MESSAGES } from "../utils/Messages";
import costumerRoute from "../app/costumer/costumerRoute";
import { MESSAGE_CODE } from "../utils/MessageCode";

const route = Router();

/**
 * @swagger
 * /customers:
 *   get:
 *     summary: Get customer routes
 *     description: Endpoint for customer-related operations
 */
route.use("/customers", costumerRoute);

/**
 * @swagger
 * /:
 *   get:
 *     summary: Welcome message
 *     responses:
 *       200:
 *         description: Returns a welcome message
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Hello World 🚀
 */
route.get("/", (req: Request, res: Response) => {
  return res.json({ message: "Hello World 🚀" });
});

/**
 * @swagger
 * /{any}:
 *   get:
 *     summary: 404 Error
 *     description: Handles any routes that are not defined
 *     responses:
 *       404:
 *         description: Route not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 404
 *                 code:
 *                   type: string
 *                   example: NOT_FOUND
 *                 message:
 *                   type: string
 *                   example: Route not found
 */
route.use("*", (req: Request, res: Response) => {
  return res.status(404).json({
    status: 404,
    code: MESSAGE_CODE.NOT_FOUND,
    message: MESSAGES.ERROR.NOT_FOUND.ROUTE,
  });
});

export default route;
