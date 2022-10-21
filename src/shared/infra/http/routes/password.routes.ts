import { ResetPasswordUserController } from "@modules/accounts/useCases/resetPasswordUser/ResetPasswordUserController";
import { SendForgotPasswordMaiController } from "@modules/accounts/useCases/sendForgotPasswordMail/SendForgotPasswordMailController";
import { Router } from "express";

const passwordRoutes = Router();

const sendForgotPasswordMaiController = new SendForgotPasswordMaiController()
const resetPasswordUserController = new ResetPasswordUserController()

passwordRoutes.post("/forgot", sendForgotPasswordMaiController.handle)
passwordRoutes.post("/reset", resetPasswordUserController.handle)

export { passwordRoutes }