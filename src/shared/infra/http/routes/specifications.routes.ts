import { CreateSpecificationController } from "@modules/cars/useCase/createSpecification/CreateSpecificationController";
import { Router } from "express";
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";



const specificationRoutes = Router()

const createSpecificationController = new CreateSpecificationController()

specificationRoutes.use(ensureAuthenticated)
specificationRoutes.post('/', createSpecificationController.handle)

export { specificationRoutes }