import { AppError } from "@shared/errors/AppError";
import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository";
import { inject, injectable } from "tsyringe";


interface IRequest {
  name: string;
  description: string;
}

/*
  definir o tipo de retorno
  alterar o retorno do erro
  acessar o repositorio
  retornar algo
*/

@injectable()
class CreateCategoryUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categorieRepository: ICategoriesRepository) {}

 async execute({ description, name }: IRequest): Promise<void> {

    const categoryAlreadyExists = await this.categorieRepository.findByName(name);

  if(categoryAlreadyExists) {
    throw new AppError("Category already exists!")
  }

  this.categorieRepository.create({ name, description })
  }

}

export { CreateCategoryUseCase }