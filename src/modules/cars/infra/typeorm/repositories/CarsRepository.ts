import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { getRepository, Repository } from "typeorm";
import { textChangeRangeIsUnchanged } from "typescript";
import { Car } from "../entities/Car";


class CarsRepository implements ICarsRepository {

  private respository: Repository<Car>

  constructor() {
    this.respository = getRepository(Car);
  }
  
  async create({ 
      name, 
      description, 
      daily_rate, 
      license_plate, 
      fine_amount, 
      brand, 
      category_id,
      specifications,
      id
   }: ICreateCarDTO): Promise<Car> {
    const car = this.respository.create({
      name, 
      description, 
      daily_rate, 
      license_plate, 
      fine_amount, 
      brand, 
      category_id,
      specifications,
      id
    });

    await this.respository.save(car)
    return car
  }
  async findByLicensePlate(license_plate: string): Promise<Car> {
    const car = await this.respository.findOne({
      license_plate
    })

    return car;
  }

  async findAvailable(brand?: string, category_id?: string, name?: string): Promise<Car[]> {
    
    const carsQuery = await this.respository.createQueryBuilder("c")
    .where("available = :available", { available: true });

    if(brand) {
      carsQuery.andWhere("c.brand = :brand", { brand })
    }

    if(name) {
      carsQuery.andWhere("c.name = :name", { name })
    }

    if(category_id) {
      carsQuery.andWhere("c.category_id = :category_id", { category_id })
    }

    const cars = await carsQuery.getMany();

    return cars;
  }

   async findById(id: string): Promise<Car> {
    const car = await this.respository.findOne(id);
    return car
  }

  async updateAvailable(id: string, available: boolean): Promise<void> {
    await this.respository
      .createQueryBuilder()
      .update()
      .set({ available })
      .where("id = :id")
      .setParameters({ id })
      .execute();
  }

}

export { CarsRepository }