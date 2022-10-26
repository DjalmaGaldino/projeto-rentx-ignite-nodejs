// verifica se determinado usuário que está acessando a rota é autenticado
import { AppError } from "@shared/errors/AppError";
import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { UsersTokensRepository } from "@modules/accounts/infra/typeorm/repositories/UsersTokensRepository";
import auth from "@config/auth";


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
    const { sub: user_id } = verify(token, auth.secret_token) as IPayload;

    request.user = {
      id: user_id
    }

    next()
  } catch {
    throw new AppError("Invalid token", 401)
  }

}