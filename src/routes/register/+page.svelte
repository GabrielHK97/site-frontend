<script lang="ts">
	import '../../app.css';
	import axios from 'axios';
	import { RegisterAccountDto } from '../../dto/account/register-account.dto';

	const registerAccountDto: RegisterAccountDto = new RegisterAccountDto();
	let message: string = '';

	function isValid() {
		return (
			registerAccountDto.username &&
			registerAccountDto.password &&
			registerAccountDto.name &&
			registerAccountDto.birthdate &&
			registerAccountDto.email.includes('@') &&
			registerAccountDto.email.includes('.') &&
			registerAccountDto.email.split('.')[1]
		);
	}

	function register() {
		if (isValid()) {
			axios.defaults.baseURL = import.meta.env.VITE_API_URL;
			axios
				.post('/account/register', registerAccountDto)
				.then((res) => {
					message = res.data.message;
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
			<div class="card-title justify-center items-center text-md">Register</div>
			<label class="flex flex-col space-y-1 w-48">
				<div class="text-sm">Username</div>
				<input class="input input-sm w-full" bind:value={registerAccountDto.username} />
			</label>
			<label class="flex flex-col space-y-1 w-48">
				<div class="text-sm">Password</div>
				<input
					class="input input-sm w-full"
					type="password"
					bind:value={registerAccountDto.password}
				/>
			</label>
			<label class="flex flex-col space-y-1 w-48">
				<div class="text-sm">Name</div>
				<input class="input input-sm w-full" bind:value={registerAccountDto.name} />
			</label>
			<label class="flex flex-col space-y-1 w-48">
				<div class="text-sm">email</div>
				<input class="input input-sm w-full" type="email" bind:value={registerAccountDto.email} />
			</label>
			<label class="flex flex-col space-y-1 w-48">
				<div class="text-sm">Birthdate</div>
				<input
					class="input input-sm w-full"
					type="date"
					bind:value={registerAccountDto.birthdate}
				/>
			</label>
			<button class="btn btn-primary btn-sm w-24 text-neutral" on:click={register}
				>Register</button
			>
			{message}
		</div>
	</div>
</div>
