
import { writable } from 'svelte/store';
import type { NavbarTree } from './components/elements/navbar/classes/navbar-tree.class';
import type { BreadcrumbElement } from './components/elements/breadcrumb/classes/breadcrumb-element.class';
import { PageRouter } from './components/src/classes/page-router.class';
import { setNavbar } from './components/elements/navbar/navbar';
import { setBreadcrumb } from './components/elements/breadcrumb/breadcrumb';

export const navbar = writable([] as NavbarTree[]);
export const breadcrumb = writable([] as BreadcrumbElement[]);

export const page: PageRouter[] = [
	new PageRouter('Home', '', ''),
	new PageRouter('Register', 'register', ''),
    new PageRouter('Login', 'login', ''),
    new PageRouter('Account', 'account', ''),
];

navbar.set(setNavbar(page));
breadcrumb.set(setBreadcrumb(page));