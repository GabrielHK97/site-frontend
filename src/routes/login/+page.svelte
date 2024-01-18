<script lang="ts">
	import '../../app.css';
	import axios from 'axios';
	import { goto } from '$app/navigation';
	import { LoginAccountDto } from '../../dto/account/login-account.dto';

	const loginAccountDto: LoginAccountDto = new LoginAccountDto();
	let message: string = '';

	function isValid() {
		return loginAccountDto.username && loginAccountDto.password;
	}

	function login() {
		if (isValid()) {
			axios.defaults.baseURL = import.meta.env.VITE_API_URL;
			axios
				.post('/auth/login', loginAccountDto, { withCredentials: true })
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
		<div class="card-body justify-center items-center">
			<div class="card-title justify-center items-center text-md">Login</div>
			<label class="flex flex-col space-y-1 w-48">
				<div class="text-sm">Username</div>
				<input class="input input-sm w-full" bind:value={loginAccountDto.username} />
			</label>
			<label class="flex flex-col space-y-1 w-48">
				<div class="text-sm">Password</div>
				<input class="input input-sm w-full" type="password" bind:value={loginAccountDto.password} />
			</label>
			<button class="btn btn-primary btn-sm w-24 text-neutral mt-1" on:click={login}>Login</button>
			{message}
		</div>
	</div>
</div>
