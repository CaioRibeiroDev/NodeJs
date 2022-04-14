import { AppError } from "@shared/errors/AppError";
import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersReporitory";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

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
    const {sub: user_id} = verify(token, "54d8132e32224f1791bc4965cf89996b") as IPayload; //quando foi criado; expiração; sub
    
    const usersRepository = new UsersRepository();
    const user = await usersRepository.findById(user_id);

    if(!user) {
      throw new AppError("User odes not exists", 401);
    }

    request.user = {
      id: user_id
    }

    next();
  } catch {
    throw new AppError("Invalid token!", 401)
  }
}