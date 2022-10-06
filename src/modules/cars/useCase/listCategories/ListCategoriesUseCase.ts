import { Category } from '@modules/cars/infra/typeorm/entities/Category';
import { ICategoriesRepository } from '@modules/cars/repositories/ICategoriesRepository';
import { inject, injectable } from 'tsyringe';


@injectable()
class ListCategoriesUseCase {
  constructor(
    @inject("CategoriesRepository")
    private categorieRepository: ICategoriesRepository) {}

  async execute(): Promise<Category[]> {
    const categories = await this.categorieRepository.list();

    return categories;
  }
}

export { ListCategoriesUseCase }