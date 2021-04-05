import IUserDTO from "@modules/accounts/dtos/IUserDTO";
import User from "@modules/accounts/infra/typeorm/entities/User";

import IUsersRepository from "../IUsersRepository";

export default class UsersRepositoryInMemory implements IUsersRepository {
  users: User[] = [];

  async create({
    driver_license,
    email,
    name,
    password,
  }: IUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, { driver_license, email, name, password });
    this.users.push(user);

    return user;
  }

  async findByEmail(email: string): Promise<User> {
    return this.users.find((user) => user.email === email);
  }

  async findById(id: string): Promise<User> {
    return this.users.find((user) => user.id === id);
  }
}
