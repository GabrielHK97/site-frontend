<script lang="ts">
	import '../../app.css';
	import { LoginAccount } from '../../classes/login-account.class';
	import { InputTypes } from '../../components/elements/input/constants/input-types.constants';
	import { getValidFields } from '../../components/src/functions/get-valid-fields.function';
	import Input from '../../components/elements/input/input.component.svelte';
	import axios from 'axios';
	import { Session } from '../../session/session';
	import { goto } from '$app/navigation';

	const loginAccount: LoginAccount = new LoginAccount();
	const validFields: any = getValidFields(loginAccount);
	let message: string = '';

	function login() {
		if (validFields.isValid()) {
			axios.defaults.baseURL = import.meta.env.VITE_API_URL;
			axios
				.post('/auth/login', loginAccount)
				.then((res) => {
					const token = res.data.data.token;
					Session.setToken(token);
					goto('/account')
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
			<div class="card-title justify-center items-center text-md">Login</div>
			<Input
				label="Username"
				placeholder="username"
				className="input input-sm input-bordered rounded-lg"
				type={InputTypes.TEXT}
				bind:value={loginAccount.username}
				bind:valid={validFields.username}
			/>
			<Input
				label="Password"
				placeholder="password"
				className="input input-sm input-bordered rounded-lg"
				type={InputTypes.PASSWORD}
				bind:value={loginAccount.password}
				bind:valid={validFields.password}
			/>
			<button class="btn btn-primary btn-sm w-24 text-neutral mt-1" on:click={login}>Login</button>
			{message}
		</div>
	</div>
</div>
