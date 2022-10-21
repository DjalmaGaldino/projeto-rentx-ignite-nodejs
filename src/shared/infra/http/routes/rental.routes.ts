import { CreateRentalController } from "@modules/rentals/useCases/createRental/CreateRentalController";
import { DevolutionRentalController } from "@modules/rentals/useCases/devolutionRental/DevolutionRentalController";
import { ListRentalsUserController } from "@modules/rentals/useCases/listRentalsByUser/ListRentalsByUserController";
// import { ListRentalsUserController } from "@modules/rentals/useCases/listRentalsByUser/ListRentalsByUsercontroller";
import { Router } from "express";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const rentalRoutes = Router();

const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController()
const listRentalsUserController = new ListRentalsUserController()

rentalRoutes.post("/", ensureAuthenticated, createRentalController.handle)
rentalRoutes.post("/devolution/:id", ensureAuthenticated,devolutionRentalController.handle)
rentalRoutes.get("/users", ensureAuthenticated, listRentalsUserController.handle)


export { rentalRoutes }


