import { inject, injectable } from "tsyringe";

import deleteFile from "@shared/utils/deleteFile";

import IUsersRepository from "../repositories/IUsersRepository";

interface IRequest {
  userId: string;
  avatarFile: string;
}

@injectable()
export default class UpdateUserAvatarUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({ userId, avatarFile }: IRequest): Promise<void> {
    const user = await this.usersRepository.findById(userId);

    if (user.avatar) {
      await deleteFile(`./tmp/avatars/${user.avatar}`);
    }

    user.avatar = avatarFile;

    await this.usersRepository.create(user);
  }
}
