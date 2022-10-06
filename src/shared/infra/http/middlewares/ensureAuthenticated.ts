// verifica se determinado usuário que está acessando a rota é autenticado
import { AppError } from "@shared/errors/AppError";
import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";


interface IPayload {
  sub: string;
}


export async function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
  
  // headers e authorization ja vem por padrão do request
  const authHeader = request.headers.authorization;

  if(!authHeader) {
    throw new AppError("Token missing", 401)
  }

  //Bearer opqiertq8-w907q3hf(token)
  const [, token] = authHeader.split(" ");

  try {
    const { sub: user_id } = verify(token, "42bfce0680d70e20d408d3d65bf96325") as IPayload;
    // console.log(':::::::::::::::::: - testing veirficando - :::::::::::::::>>>>', user_id);

    const userRepository = new UsersRepository();
    const user = await userRepository.findById(user_id)

    if(!user) {
      throw new AppError("User dos not Exists!", 401)
    }

    request.user = {
      id: user.id
    }

    next()
  } catch {
    throw new AppError("Invalid token", 401)
  }

}