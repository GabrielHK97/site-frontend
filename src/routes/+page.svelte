<script lang="ts">
	import { goto } from '$app/navigation';
	import '../app.css';
	import { setNavbar } from '../components/elements/navbar/navbar';
	import NavbarComponent from '../components/elements/navbar/navbar-component.svelte';
	import { PageRouter } from '../components/src/classes/page-router.class';

	function redirectToLogin(): void {
		goto('/login');
	}

	function redirectToRegister(): void {
		goto('/register');
	}

	const pagesRouter: PageRouter[] = [
		new PageRouter('Panel', 'panel', ''),
		new PageRouter('Tenants', 'tenants', '', [
			new PageRouter('List', '', ''),
			new PageRouter('Create', 'create', '')
		]),
		new PageRouter('Owners', 'owners', '', [
			new PageRouter('List', '', ''),
			new PageRouter('Create', 'create', '')
		]),
		new PageRouter('Stores', 'stores', '', [
			new PageRouter('List', '', ''),
			new PageRouter('Create', 'create', '')
		]),
		new PageRouter('QRCode', 'qrcode', '')
	];

	const navbarElements = setNavbar(pagesRouter);
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
			<NavbarComponent navbarElements={navbarElements}></NavbarComponent>
		</div>
	</div>
</div>
