import { Input } from "../../components/components/input/classes/input.class";

export class LoginAccountDto {
	username: Input;
	password: Input;

	constructor() {
		this.username = new Input();
		this.password = new Input();
	}
}
