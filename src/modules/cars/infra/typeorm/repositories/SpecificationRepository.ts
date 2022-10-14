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

  async create({ description, name }: ICreateSpecificationDTO):Promise<Specification> {
    const specification = this.repository.create({
      description,
      name
    });

    await this.repository.save(specification);
    return specification;
  }

  async findByIds(ids: string[]): Promise<Specification[]> {
    const specifications = await this.repository.findByIds(ids);
    return specifications;
  }
}

export { SpecificationRepository }