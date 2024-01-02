export class RegisterAccount {
	username: string;
	password: string;
	name: string;
	email: string;
	birthdate: Date | undefined;

	constructor(
		username?: string,
		password?: string,
		name?: string,
		email?: string,
		birthdate?: Date
	) {
		this.username = username ?? '';
		this.password = password ?? '';
		this.name = name ?? '';
		this.email = email ?? '';
		this.birthdate = birthdate ?? undefined;
	}
}
