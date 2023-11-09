import {Body, Controller} from '@nestjs/common';
import {RMQRoute, RMQValidate} from 'nestjs-rmq';
import {UserRepository} from './repositories/user.repository';
import {AccountChangeProfile} from "@purple/contracts";

@Controller()
export class UserCommands {
	constructor(
		private readonly userRepository: UserRepository
	) {}

	@RMQValidate()
	@RMQRoute(AccountChangeProfile.topic)
	async changeProfile(@Body() dto: AccountChangeProfile.Request): Promise<AccountChangeProfile.Response> {
		return this.authService.register(dto);
	}

}
