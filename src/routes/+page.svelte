<script lang="ts">
	import { goto } from '$app/navigation';
	import '../app.css';

	function redirectToLogin(): void {
		goto('/login');
	}

	function redirectToRegister(): void {
		goto('/register');
	}

</script>

<div class="flex h-screen w-screen justify-center items-center">
	<div class="card w-96 bg-base-300 shadow-xl">
		<div class="card-body justify-center items-center">
			<div class="card-title justify-center items-center text-md">Card game</div>
			<button class="btn btn-primary btn-sm w-24 text-neutral" on:click={redirectToLogin}
				>Login</button
			>
			<button class="btn btn-primary btn-sm w-24 text-neutral" on:click={redirectToRegister}
				>Register</button
			>
		</div>
	</div>
</div>
