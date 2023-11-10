import { Body, Controller } from '@nestjs/common';
import { RMQRoute, RMQValidate } from 'nestjs-rmq';
import { UserRepository } from './repositories/user.repository';
import { AccountChangeProfile } from '@purple/contracts';
import { UserEntity } from './entities/user.entity';

@Controller()
export class UserCommands {
  constructor(
    private readonly userRepository: UserRepository
  ) {
  }

  @RMQValidate()
  @RMQRoute(AccountChangeProfile.topic)
  async changeProfile(@Body() { user, id }: AccountChangeProfile.Request): Promise<AccountChangeProfile.Response> {
    const foundUser = await this.userRepository.findUserById(id);

    if (!foundUser)
      throw new Error('Such user does not exist');

    const userEntity = new UserEntity(foundUser).updateProfile(user.displayName);
    await this.userRepository.updateUser(userEntity);

    return {};
  }

}
