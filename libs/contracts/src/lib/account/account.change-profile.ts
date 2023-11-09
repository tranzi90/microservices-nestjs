import { IsEmail, IsOptional, IsString } from 'class-validator';

export namespace AccountChangeProfile {
	export const topic = 'account.change-profile.command';

	export class Request {
    @IsOptional()
    @IsEmail()
		email?: string;

		@IsOptional()
		@IsString()
		displayName?: string;
	}

	export class Response {
		email: string;
    displayName: string;
	}
}

