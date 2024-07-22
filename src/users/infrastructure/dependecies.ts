import IUserRepositoryPort from "../application/ports/IUserRepositoryPort";
import UserRepositoryAdapter from "./adapters/UserRepositoryAdapter";

import AuthenticateUseCase from "../application/usecases/AuthenticateUserUseCase";
import CreateUserUseCase from "../application/usecases/CreateUserUseCase";
import UpdateUserUseCase from "../application/usecases/UpdateUserUseCase";

const userRepositoryAdapter: IUserRepositoryPort = new UserRepositoryAdapter();

const authenticateUseCase = new AuthenticateUseCase(userRepositoryAdapter);
const createUserUseCase = new CreateUserUseCase(userRepositoryAdapter);
const updateUserUseCase = new UpdateUserUseCase(userRepositoryAdapter);

export {authenticateUseCase, createUserUseCase, updateUserUseCase};