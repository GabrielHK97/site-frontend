import type { IconDefinition } from '@fortawesome/free-solid-svg-icons';

export class PageRouter {
	name: string;
	path: string;
	fullPath: string = '';
	icon: IconDefinition;
	pages?: PageRouter[] = [];

	constructor(name: string, path: string, icon: IconDefinition, pages?: PageRouter[]) {
		this.name = name;
		this.path = path;
		this.icon = icon;
		this.pages = pages;
	}
}
