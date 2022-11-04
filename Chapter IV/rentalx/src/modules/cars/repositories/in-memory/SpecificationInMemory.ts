import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";
import { ICreateSpecificationDTO, ISpecificationsRepository } from "../ISpecificationsRepository";

class SpecificationInMemory implements ISpecificationsRepository {

  specifications: Specification[] = []

  async create({ name, description }: ICreateSpecificationDTO): Promise<Specification> {
    const specification = new Specification();

    Object.assign(specification, {
      description,
      name,
    })
    
    this.specifications.push(specification)

    return specification;
  }

  async findByName(name: string): Promise<Specification> {
    return this.specifications.find(s => s.name === name);
  }

  async list(): Promise<Specification[]> {
    return this.specifications
  }

  async findByIds(ids: string[]): Promise<Specification[]> {
    const allSpecifications = this.specifications.filter(s => ids.includes(s.id));
    return allSpecifications;
  }

}

export { SpecificationInMemory }