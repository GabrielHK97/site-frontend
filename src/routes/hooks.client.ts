import {
	faDatabase,
	faChartSimple,
	faCirclePlus,
	faUser,
	faStore,
	faList,
	faQrcode
} from '@fortawesome/free-solid-svg-icons';
import { writable } from 'svelte/store';
import { PageRouter } from '../components/classes/page-router.class';
import { setBreadcrumb } from '../components/components/breadcrumb/breadcrumb';
import { BreadcrumbElement } from '../components/components/breadcrumb/classes/breadcrumb.class';
import { NavbarTree } from '../components/components/navbar/classes/navbar-tree.class';
import { setNavbar } from '../components/components/navbar/navbar';

export const navbar = writable([] as NavbarTree[]);
export const breadcrumb = writable([] as BreadcrumbElement[]);

export const pages: PageRouter[] = [
	new PageRouter('Panel', 'panel', faChartSimple),
	new PageRouter('Cards', 'card', faDatabase, [
		new PageRouter('List', '', faList),
		new PageRouter('Create', 'create', faCirclePlus)
	]),
	new PageRouter('Sets', 'set', faUser, [
		new PageRouter('List', '', faList),
		new PageRouter('Create', 'create', faCirclePlus)
	]),
	new PageRouter('Formats', 'format', faStore, [
		new PageRouter('List', '', faList),
		new PageRouter('Create', 'create', faCirclePlus)
	]),
];

navbar.set(setNavbar(pages));
breadcrumb.set(setBreadcrumb(pages));
