import { CategoriesRepositoryInMemory } from "@modules/cars/repositories/in-memory/CategoriesRepositoryInMemory";
import { CreateCarUseCase } from "./CreateCarUseCase"

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CategoriesRepositoryInMemory;

describe("Create car", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CategoriesRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  it("should be able to create a new car", async () => {
    await createCarUseCase.execute({
      name: "Name Car", 
      description: "Description Car", 
      daily_rate: 100, 
      license_plate: "ABC-1234", 
      fine_amount: 60, 
      brand: "Brand", 
      category_id: "category"
    });
  })
})