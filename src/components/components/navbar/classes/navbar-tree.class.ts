import type { IconDefinition } from '@fortawesome/free-solid-svg-icons/';

export class NavbarTree {
    name: string;
    path: string;
	fullPath: string;
	icon: IconDefinition;
	expanded: boolean = false;
	elements: NavbarTree[];

	constructor(name: string, path: string, fullPath: string, icon: IconDefinition, elements?: NavbarTree[]) {
        this.name = name;
        this.path = path;
		this.fullPath = fullPath;
		this.icon = icon;
		this.elements = elements ?? [];
	}

	setExpanded(expanded: boolean): void {
		this.expanded = expanded;
	}
}