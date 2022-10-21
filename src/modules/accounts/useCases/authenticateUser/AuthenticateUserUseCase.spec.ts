import { AppError } from "@shared/errors/AppError";
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase"
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";


let autheticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory
let createUserUseCase: CreateUserUseCase;
let userTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let dateProvider: DayjsDateProvider;


describe("Authenticate user", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory()
    userTokensRepositoryInMemory = new UsersTokensRepositoryInMemory()
    dateProvider = new DayjsDateProvider()

    autheticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory, 
      userTokensRepositoryInMemory, 
      dateProvider
    );

    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it("should be able to authenticate an user", async () => {
    const user: ICreateUserDTO = {
      driver_license: "0001234",
      email: "user@teste.com",
      password: "1234",
      name: "User test"
    };
    await createUserUseCase.execute(user);

    const result = await autheticateUserUseCase.execute({
      email: user.email,
      password: user.password
    });

    expect(result).toHaveProperty("token")
  });

  it("should not be able to authenticate an nonexistent user", async () => {
    await expect(
        autheticateUserUseCase.execute({
        email: "false@email.com",
        password: "1234"
      })
    ).rejects.toEqual(new AppError("Email or Password incorrect"))
  });

  it("should not be able to authenticate with uncorrect password", async () => {

    const user: ICreateUserDTO = {
      driver_license: "9999",
      email: "user@user.com",
      password: "1234",
      name: "user test error"
    }

    await createUserUseCase.execute(user);

    await expect(
        autheticateUserUseCase.execute({
        email: user.email,
        password: "incorrectPassword"
      })
    ).rejects.toEqual(new AppError("Email or Password incorrect"))
  })
})