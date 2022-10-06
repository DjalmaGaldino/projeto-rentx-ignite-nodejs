import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRespositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateCarUseCase } from "./CreateCarUseCase";


let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create Car", () => {
  
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory)
  })

  it("should be albe to create a new car", async () => {
    const car = await createCarUseCase.execute({
      name: "name car",
      description: "Description car",
      daily_rate: 100,
      license_plate: "ABC-123",
      fine_amount: 60,
      brand: "Brand",
      category_id: "category"
    });
    expect(car).toHaveProperty("id")
  });

  it("should not be able to create a car with exists license plate", () => {
    expect(async () => {
      await createCarUseCase.execute({
        name: "name car1",
        description: "Description car",
        daily_rate: 100,
        license_plate: "ABC-123",
        fine_amount: 60,
        brand: "Brand",
        category_id: "category"
      });

      await createCarUseCase.execute({
        name: "name car2",
        description: "Description car",
        daily_rate: 100,
        license_plate: "ABC-123",
        fine_amount: 60,
        brand: "Brand",
        category_id: "category"
      });
    }).rejects.toBeInstanceOf(AppError)
  });


  it("should not be able to create a car with avaliable true by default", () => {
    expect(async () => {
      const car = await createCarUseCase.execute({
        name: "Car available",
        description: "Description car",
        daily_rate: 100,
        license_plate: "ABCD-1234",
        fine_amount: 60,
        brand: "Brand",
        category_id: "category"
      });

      expect(car.available).toBe(true)

    })
  })
})