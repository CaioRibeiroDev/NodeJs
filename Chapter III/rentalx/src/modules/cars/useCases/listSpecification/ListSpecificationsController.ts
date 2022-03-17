import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListSpecificationUseCase } from "./ListSpecificationsUseCase";

class ListSpecificationsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listSpecificationUseCase = container.resolve(ListSpecificationUseCase)
    
    const all = await listSpecificationUseCase.execute()
    
    return response.status(200).json(all);
  }
}

export { ListSpecificationsController };
