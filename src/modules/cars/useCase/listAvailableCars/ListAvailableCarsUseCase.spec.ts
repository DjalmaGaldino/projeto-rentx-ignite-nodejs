
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase"


let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", () => {

  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory)
  })

  it("should be able to list all available car", async () => {

    const car = await carsRepositoryInMemory.create({
      name: "Car1",
      description: "Car description",
      daily_rate: 50,
      license_plate: "ABCD-123",
      fine_amount: 100,
      brand: "Car brand",
      category_id: "category id"
    });

    const cars = await listAvailableCarsUseCase.execute({})
    console.log(cars)

    expect(cars).toEqual([car])
  });

  it("should be able to list all available cars by brand", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car2",
      description: "Car2 description",
      daily_rate: 50,
      license_plate: "ABCD-123",
      fine_amount: 100,
      brand: "Car2 brand_test",
      category_id: "category id"
    });

    const cars = await listAvailableCarsUseCase.execute({
      brand: "Car_brand"
    })

    expect(cars).toEqual([car])
  });

  it("should be able to list all available cars by name", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car3",
      description: "Car3 description",
      daily_rate: 60,
      license_plate: "ABCD-123",
      fine_amount: 100,
      brand: "Car3 brand_test",
      category_id: "category id"
    });

    const cars = await listAvailableCarsUseCase.execute({
      name: "Car3_brand"
    })

    expect(cars).toEqual([car])
  });

  it("should be able to list all available cars by category", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car4",
      description: "Car4 description",
      daily_rate: 60,
      license_plate: "ABCD-123",
      fine_amount: 100,
      brand: "Car3 brand_test",
      category_id: "category 12345"
    });

    const cars = await listAvailableCarsUseCase.execute({
      name: "Car4_brand"
    })

    expect(cars).toEqual([car])
  });

  it("Should be able to list all avaliable cars by category id", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Volvo sei l?? ",
      description: "Carro bom",
      daily_rate: 400.0,
      license_plate: "IHX5-G93",
      fine_amount: 150.0,
      brand: "Fiat",
      category_id: "1a2b3c4d",
    });

    const cars = await listAvailableCarsUseCase.execute({ category_id: "1a2b3c4d" });
    expect(cars).toEqual([car]);
  });

  })
