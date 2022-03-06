import { SpecificationsRepository } from "../../repositories/SpecificationsRepository";
import { ListSpecificationsController } from "./ListSpecificationsController";
import { ListSpecificationUseCase } from "./ListSpecificationsUseCase";

const specificationsRepository = SpecificationsRepository.getInstance();
const listSpecificationUseCase = new ListSpecificationUseCase(specificationsRepository);
const listSpecificationsController = new ListSpecificationsController(listSpecificationUseCase); 

export { listSpecificationsController }
