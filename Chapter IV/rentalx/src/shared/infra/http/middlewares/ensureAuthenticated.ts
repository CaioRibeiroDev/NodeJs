import { AppError } from "@shared/errors/AppError";
import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersReporitory";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { UsersTokensRepository } from "@modules/accounts/infra/typeorm/repositories/UsersTokensReporitory";
import auth from "@config/auth";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(request: Request, response: Response, next: NextFunction): Promise<void> {
  const authHeader = request.headers.authorization;

  if(!authHeader){
    throw new AppError("Token missing", 401);
  }

  // Bearer 112ejhih4h5ghf-dg9083f
  const [, token] = authHeader.split(" ");

  try {
    const {sub: user_id} = verify(
      token,
      auth.secret_token
    ) as IPayload; //quando foi criado; expiração; sub

    request.user = {
      id: user_id
    }

    next();
  } catch {
    throw new AppError("Invalid token!", 401)
  }
}
