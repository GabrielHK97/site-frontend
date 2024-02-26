<script lang="ts">
	import '../../app.css';
	import axios from 'axios';
	import { goto } from '$app/navigation';
	import { LoginAccountDto } from '../../dto/account/login-account.dto';
	import InputRootComponent from '../../components/components/input/components/input-root-component.svelte';
	import InputLabelComponent from '../../components/components/input/components/input-label-component.svelte';
	import InputComponent from '../../components/components/input/components/input-component.svelte';
	import { getValidFields } from '../../components/components/input/functions/get-valid-fields.function';

	const loginAccountDto: LoginAccountDto = new LoginAccountDto();
	loginAccountDto.username.label = 'Username';
	loginAccountDto.username.placeholder = 'username';
	loginAccountDto.password.label = 'Password';
	loginAccountDto.password.placeholder = 'password';
	const loginValidator = getValidFields(loginAccountDto);
	let message: string = '';

	function login() {
		if (loginValidator.isValid()) {
			axios.defaults.baseURL = import.meta.env.VITE_API_URL;
			axios
				.post(
					'/auth/login',
					{ username: loginAccountDto.username.value, password: loginAccountDto.password.value },
					{ withCredentials: true }
				)
				.then((res) => {
					goto('/panel');
				})
				.catch((e) => {
					message = e.response.data.message;
				});
		}
	}
</script>

<div class="flex h-screen w-screen justify-center items-center">
	<div class="card w-96 bg-base-300 shadow-xl">
		<div class="card-body justify-center items-center space-y-1">
			<div class="card-title justify-center items-center text-md">Login</div>
			<InputRootComponent class="flex flex-col space-y-1">
				<InputLabelComponent label={loginAccountDto.username.label} class="text-sm" />
				<InputComponent
					id={loginAccountDto.username.label}
					bind:firstTime={loginAccountDto.username.firstTime}
					bind:valid={loginValidator.username}
					bind:value={loginAccountDto.username.value}
					bind
					class="input input-sm w-full"
				/>
			</InputRootComponent>
			<InputRootComponent class="flex flex-col space-y-1">
				<InputLabelComponent label={loginAccountDto.password.label} class="text-sm" />
				<InputComponent
					id={loginAccountDto.password.label}
					bind:firstTime={loginAccountDto.password.firstTime}
					bind:valid={loginValidator.password}
					bind:value={loginAccountDto.password.value}
					class="input input-sm w-full"
				/>
			</InputRootComponent>
			<button class="btn btn-primary btn-sm w-24 text-neutral" on:click={login}>Login</button>
			{message}
		</div>
	</div>
</div>
