<script lang="ts">
	import '../../app.css';
	import { RegisterAccount } from '../../classes/register-account.class';
	import { InputTypes } from '../../components/elements/input/constants/input-types.constants';
	import { getValidFields } from '../../components/src/functions/get-valid-fields.function';
	import Input from '../../components/elements/input/input.component.svelte';
	import axios from 'axios';
	import { ValidatingFunctions } from '../../components/src/classes/validating-function.class';

	const registerAccount: RegisterAccount = new RegisterAccount();
	const validFields: any = getValidFields(registerAccount);
	let message: string = '';

	function reg() {
		if (validFields.isValid()) {
			axios.defaults.baseURL = import.meta.env.VITE_API_URL;
			axios
				.post('/account', registerAccount)
				.then((res) => {
					message = res.data.message;
				})
				.catch((e) => {
					message = e.message;
				});
		}
	}
</script>

<div class="flex h-screen w-screen justify-center items-center">
	<div class="card w-96 bg-base-300 shadow-xl">
		<div class="card-body justify-center items-center">
			<div class="card-title justify-center items-center text-md">Register</div>
			<Input
				label="Username"
				placeholder="username"
				className="input input-sm input-bordered rounded-lg"
				type={InputTypes.TEXT}
				bind:value={registerAccount.username}
				bind:valid={validFields.username}
			/>
			<Input
				label="Password"
				placeholder="password"
				className="input input-sm input-bordered rounded-lg"
				type={InputTypes.PASSWORD}
				bind:value={registerAccount.password}
				bind:valid={validFields.password}
			/>
			<Input
				label="E-mail"
				placeholder="e-mail"
				className="input input-sm input-bordered rounded-lg"
				type={InputTypes.TEXT}
				bind:value={registerAccount.email}
				bind:valid={validFields.email}
				validatingFunction={ValidatingFunctions.email}
			/>
			<Input
				label="Name"
				placeholder="name"
				className="input input-sm input-bordered rounded-lg"
				type={InputTypes.TEXT}
				bind:value={registerAccount.name}
				bind:valid={validFields.name}
			/>
			<Input
				label="Birthdate"
				className="input input-sm input-bordered rounded-lg"
				type={InputTypes.DATE}
				bind:value={registerAccount.birthdate}
				bind:valid={validFields.birthdate}
			/>
			<button class="btn btn-primary btn-sm w-24 text-neutral mt-1" on:click={reg}
				>Register</button
			>
			{message}
		</div>
	</div>
</div>
