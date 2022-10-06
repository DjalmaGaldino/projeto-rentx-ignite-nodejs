import { ICreateSpecificationDTO, ISpecificationRepository } from "@modules/cars/repositories/ISpecificationRepository";
import { getRepository, Repository } from "typeorm";
import { Specification } from "../entities/Specification";



class SpecificationRepository implements ISpecificationRepository {

  private repository: Repository<Specification>

  constructor() {
    this.repository = getRepository(Specification)
  }

  async findByName(name: string): Promise<Specification> {
    const specifications = this.repository.findOne({
      name
    });

    return specifications;
  }

  async create({ description, name }: ICreateSpecificationDTO):Promise<void> {
    const specification = this.repository.create({
      description,
      name
    });

    await this.repository.save(specification)
  }
}

export { SpecificationRepository }