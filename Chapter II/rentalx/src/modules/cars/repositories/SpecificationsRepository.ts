import { Specification } from "../model/Specification";
import { ICreateSpecificationDTO, ISpecificationsRepository } from "./implementations/ISpecificationsRepository";

class SpecificationsRepository implements ISpecificationsRepository{
  // criando tabela fake
  private specifications: Specification[];

  private static INSTANCE: SpecificationsRepository;

  private constructor() {
    // inicializando array
    this.specifications = []
  } 

  public static getInstance(): SpecificationsRepository {
    if(!SpecificationsRepository.INSTANCE) {
      SpecificationsRepository.INSTANCE = new SpecificationsRepository()
    }

    return SpecificationsRepository.INSTANCE;
  }
  
  create({ name, description }: ICreateSpecificationDTO): void {
    const specification = new Specification()
    Object.assign(specification, {
      name,
      description,
      created_at: new Date(),
    });
  
    this.specifications.push(specification);
  }

  list(): Specification[] {
    return this.specifications;
  }

  findByName(name: string): Specification {
    const specification = this.specifications.find(sp => sp.name === name);
    return specification
  }
}

export { SpecificationsRepository }

// https://medium.com/talpor/windows-terminal-cmder-%EF%B8%8F-573e6890d143