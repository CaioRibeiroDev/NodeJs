import { container } from "tsyringe"

import "@shared/container/providers"

import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository"
import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository"
import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository"
import { CategoriesRepository } from "@modules/cars/infra/typeorm/repositories/CategoriesRepository"
import { SpecificationsRepository } from "@modules/cars/infra/typeorm/repositories/SpecificationsRepository"
import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersReporitory"
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository"
import { CarsRepository } from "@modules/cars/infra/typeorm/repositories/CarsRepository"
import { ICarsImagesRepository } from "@modules/cars/repositories/ICarsImagesRepository"
import { CarImagesRepository } from "@modules/cars/infra/typeorm/repositories/CarImagesRepository"
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository"
import { RentalsRepository } from "@modules/rentals/infra/typeorm/repositories/RentalsRepository"
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository"
import { UsersTokensRepository } from "@modules/accounts/infra/typeorm/repositories/UsersTokensReporitory"


// ICategoryRepository
container.registerSingleton<ICategoriesRepository>(
  "CategoriesRepository",
  CategoriesRepository
)

container.registerSingleton<ISpecificationsRepository>(
  "SpecificationsRepository",
  SpecificationsRepository
)

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
)

container.registerSingleton<ICarsRepository> (
  "CarsRepository",
  CarsRepository
)

container.registerSingleton<ICarsImagesRepository> (
  "CarImagesRepository",
  CarImagesRepository
)

container.registerSingleton<IRentalsRepository> (
  "RentalsRepository",
  RentalsRepository
)

container.registerSingleton<IUsersTokensRepository> (
  "UsersTokensRepository",
  UsersTokensRepository
)
