import dayjs from "dayjs";
import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateRentalUseCase } from "./CreateRentalUseCase"
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";


let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;
let carsRepositoryInMemory: CarsRepositoryInMemory

describe("Create Rental", () => {
  const dayAdd24Hours = dayjs().add(1, "day").toDate();

  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    dayjsDateProvider = new DayjsDateProvider()
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory, 
      dayjsDateProvider,
      carsRepositoryInMemory
    )
  });

  it("should be able to create a new Rental", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Test",
      description: "Car Test",
      daily_rate: 100,
      license_plate: "test",
      fine_amount: 40,
      category_id: "1234",
      brand: "brand",
    });
  
    const rental = await createRentalUseCase.execute({
      user_id: "12345",
      car_id: car.id,
      expected_return_date: dayAdd24Hours
    });
  
    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });
  
  it("should not be able to create a new Rental if there is another open to the same user", async () => {
    await rentalsRepositoryInMemory.create({
      car_id: "121212",
      expected_return_date: dayAdd24Hours,
      user_id: "12345",
    });
  
    await expect(createRentalUseCase.execute({
        user_id: "12345",
        car_id: "121212",
        expected_return_date: dayAdd24Hours
      })
    ).rejects.toBeInstanceOf(AppError)
  });
  
  it("should not be able to create a new Rental if there is another open to the same car", async () => {
    await rentalsRepositoryInMemory.create({
      car_id: "test",
      expected_return_date: dayAdd24Hours,
      user_id: "12345",
    });
  
    expect(createRentalUseCase.execute({
        user_id: "12345",
        car_id: "test",
        expected_return_date: dayAdd24Hours
      })
    ).rejects.toBeInstanceOf(AppError)
  });
  
  it("should not be able to create a new Rental with invalid return time", async () => {
  
    expect(createRentalUseCase.execute({
        user_id: "321",
        car_id: "test",
        expected_return_date: dayjs().toDate()
      })
    ).rejects.toBeInstanceOf(AppError)
  });
})

