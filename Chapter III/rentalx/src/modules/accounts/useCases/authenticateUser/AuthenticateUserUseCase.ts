import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/AppError";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    name: string,
    email: string
  },
  token: string;
}

@injectable()
class AuthenticateUserUseCase {

  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({email, password}: IRequest):Promise<IResponse> {
    // Usuario existe
    const user = await this.usersRepository.findByEmail(email);
    if(!user) {
      throw new AppError("Email or password incorrect");
    }

    // Senha está correta
    const passwordMatch = await compare(password, user.password)
    if(!passwordMatch) {
      throw new AppError("Email or password incorrect");
    }

    // Gerar JWT
    const token = sign({}, "54d8132e32224f1791bc4965cf89996b", {
      subject: user.id, //id do usuario;
      expiresIn: "1d" // quando que expira;
    })

    const tokenReturn: IResponse = {
      token,
      user: {
        name: user.name,
        email: user.email
      }
    }

    return tokenReturn;
  }
}

export { AuthenticateUserUseCase }